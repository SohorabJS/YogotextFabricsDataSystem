import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const filePath = process.argv[2] || path.join(process.cwd(), 'public', 'uploads', 'heatSettingSampleData.csv');

function parseDateOrNull(v) {
  if (!v) return null;
  const s = String(v).trim();
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    let first = parseInt(m[1], 10);
    let second = parseInt(m[2], 10);
    const year = parseInt(m[3], 10);
    let month, day;
    if (first > 12) {
      day = first; month = second;
    } else if (second > 12) {
      month = first; day = second;
    } else {
      month = first; day = second;
    }
    const d = new Date(Date.UTC(year, month - 1, day));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

// Find header line index and header columns
const raw = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
let headerIndex = -1;
for (let i = 0; i < raw.length; i++) {
  if (raw[i].toLowerCase().includes('samplecode') && raw[i].toLowerCase().includes('finishingdate')) {
    headerIndex = i;
    break;
  }
}
if (headerIndex === -1) {
  console.error('Header line with sampleCode not found');
  process.exit(2);
}
const headerLine = raw[headerIndex];
const headerCols = headerLine.split(',');
const headerCount = headerCols.length;
console.log('Header found at line', headerIndex+1, 'columns:', headerCount);

let rowIndex = 0;
let mismatchedRows = 0;
let invalidDates = 0;
const badRows = [];

fs.createReadStream(filePath)
  // skipLines should skip the title + header lines; headerIndex is 0-based index of header line
  .pipe(csv({ headers: headerCols, skipLines: headerIndex + 1 }))
  .on('data', (row) => {
    rowIndex++;
    const keys = Object.keys(row);
    if (keys.length !== headerCount) {
      mismatchedRows++;
      badRows.push({ rowIndex, reason: 'column count mismatch', keysLength: keys.length });
    }
    // Check date fields
    const sid = row['sampleIssueDate'] || row['sampleissuedate'] || row['Sample Issue Date'] || row['sampleIssueDate'];
    const fd = row['finishingDate'] || row['finishingdate'] || row['Finishing Date'] || row['finishingDate'];
    if (sid && String(sid).trim() !== '') {
      const pd = parseDateOrNull(sid);
      if (!pd) {
        invalidDates++;
        badRows.push({ rowIndex, field: 'sampleIssueDate', value: sid });
      }
    }
    if (fd && String(fd).trim() !== '') {
      const pd = parseDateOrNull(fd);
      if (!pd) {
        invalidDates++;
        badRows.push({ rowIndex, field: 'finishingDate', value: fd });
      }
    }
  })
  .on('end', () => {
    console.log('Rows parsed:', rowIndex);
    console.log('Mismatched rows:', mismatchedRows);
    console.log('Invalid date-like values found:', invalidDates);
    if (badRows.length) {
      console.log('Sample bad rows (first 20):');
      console.log(badRows.slice(0,20));
    }
  })
  .on('error', (err) => {
    console.error('CSV parse error:', err.message);
  });
