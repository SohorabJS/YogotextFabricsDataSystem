'use client';

import { useState } from 'react';

const FIELD_CONFIG = {
  basicInfo: {
    label: 'Basic Information',
    fields: [
      { key: 'sampleCode', label: 'Sample Code' },
      { key: 'sampleItemCode', label: 'Sample Item Code' },
      { key: 'processingType', label: 'Processing Type' },
      { key: 'construction', label: 'Construction' },
      { key: 'color', label: 'Color' },
      { key: 'customerName', label: 'Customer Name' },
    ]
  },
  requirements: {
    label: 'Customer Requirements',
    fields: [
      { key: 'customerRequiredWidth', label: 'Required Width' },
      { key: 'customerRequirementLengthPercent', label: 'Length Tolerance' },
      { key: 'customerRequirementWidthPercent', label: 'Width Tolerance' },
      { key: 'weightBW', label: 'Weight Tolerance' },
    ]
  },
  dates: {
    label: 'Sample Dates',
    fields: [
      { key: 'sampleIssueDate', label: 'Sample Issue Date', type: 'date' },
      { key: 'finishingDate', label: 'Sample Finishing Date', type: 'date' },
    ]
  },
  weaving: {
    label: 'Weaving Details',
    fields: [
      { key: 'loomNo', label: 'Loom' },
      { key: 'warpingNo', label: 'Wrapping No' },
      { key: 'yard', label: 'Yards' },
      { key: 'weavingPPI', label: 'PPI' },
    ]
  },
  drying: {
    label: 'After Dryer',
    fields: [
      { key: 'afterDryerWidthInch', label: 'Dryer Width' },
      { key: 'dryerSkewCM', label: 'Dryer Skew' },
    ]
  },
  shrinkage: {
    label: 'After Shrinkage',
    fields: [
      { key: 'afterShrinkagePPI', label: 'A/Shrinkage PPI' },
      { key: 'afterShrinkageSkewCM', label: 'A/Shrinkage Skew' },
      { key: 'afterShrinkageWidthInch', label: 'A/Shrinkage Width' },
      { key: 'ppiPlus', label: 'PPI(+)' },
    ]
  },
  washing: {
    label: 'After Washing',
    fields: [
      { key: 'afterWashSkewCM', label: 'A/Wash Skew' },
      { key: 'afterWashWidthInch', label: 'A/Wash Width' },
      { key: 'afterWashPPI', label: 'A/Wash PPI' },
      { key: 'boxPercentLeftHand', label: 'Left Hand Box Skew (%)' },
      { key: 'boxPercentRightHand', label: 'Right Hand Box Skew (%)' },
      { key: 'afterWashWidthPercent', label: 'A/Wash Width %' },
      { key: 'afterWashLengthPercent', label: 'A/Wash Length %' },
    ]
  },
  processing: {
    label: 'Fabrics Process Flow',
    fields: [
      { key: 'sampleProcessingDetails', label: 'Processing Details', type: 'text' },
    ]
  },
};

function formatDate(date) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

export default function SampleResultsGrid({ results, selectedItems, onSelectItem }) {
  const [expandedId, setExpandedId] = useState(null);

  if (results.length === 0) {
    return null;
  }

  // Large screen - Table view
  const LargeScreenTable = () => (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300">
            <th className="border px-3 py-2 text-left w-12">
              <input
                type="checkbox"
                checked={selectedItems.size === results.length && results.length > 0}
                onChange={() => {
                  if (selectedItems.size === results.length) {
                    const newSet = new Set(selectedItems);
                    results.forEach(r => newSet.delete(r._id));
                    onSelectItem(results[0]._id); // Trigger state update through parent
                  } else {
                    results.forEach(r => onSelectItem(r._id));
                  }
                }}
                className="w-4 h-4"
              />
            </th>
            <th className="border px-3 py-2 text-left font-semibold">Sample Code</th>
            <th className="border px-3 py-2 text-left font-semibold">Item Code</th>
            <th className="border px-3 py-2 text-left font-semibold">Processing Type</th>
            <th className="border px-3 py-2 text-left font-semibold">Construction</th>
            <th className="border px-3 py-2 text-left font-semibold">Color</th>
            <th className="border px-3 py-2 text-left font-semibold">Customer</th>
            <th className="border px-3 py-2 text-left font-semibold">Issue Date</th>
            <th className="border px-3 py-2 text-left font-semibold">Finish Date</th>
            <th className="border px-3 py-2 text-center font-semibold">View</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr
              key={item._id}
              className={`border-b ${selectedItems.has(item._id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <td className="border px-3 py-2">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item._id)}
                  onChange={() => onSelectItem(item._id)}
                  className="w-4 h-4 cursor-pointer"
                />
              </td>
              <td className="border px-3 py-2 font-semibold">{formatValue(item.sampleCode)}</td>
              <td className="border px-3 py-2">{formatValue(item.sampleItemCode)}</td>
              <td className="border px-3 py-2">{formatValue(item.processingType)}</td>
              <td className="border px-3 py-2">{formatValue(item.construction)}</td>
              <td className="border px-3 py-2">{formatValue(item.color)}</td>
              <td className="border px-3 py-2">{formatValue(item.customerName)}</td>
              <td className="border px-3 py-2">{formatDate(item.sampleIssueDate)}</td>
              <td className="border px-3 py-2">{formatDate(item.finishingDate)}</td>
              <td className="border px-3 py-2 text-center">
                <button
                  onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {expandedId === item._id ? 'Hide' : 'Details'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Small screen - Card view
  const SmallScreenCards = () => (
    <div className="lg:hidden space-y-4">
      {results.map((item) => (
        <div
          key={item._id}
          className={`border-2 rounded-lg overflow-hidden transition-all ${
            selectedItems.has(item._id) ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
          }`}
        >
          {/* Card Header with Checkbox */}
          <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={selectedItems.has(item._id)}
                onChange={() => onSelectItem(item._id)}
                className="w-5 h-5 cursor-pointer"
              />
              <div className="flex-1">
                <h3 className="font-bold text-sm md:text-base">{formatValue(item.sampleCode)}</h3>
                <p className="text-xs text-gray-600">{formatValue(item.sampleItemCode)}</p>
              </div>
            </div>
            <button
              onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
              className="text-blue-600 text-sm font-semibold px-3 py-1 hover:bg-blue-100 rounded"
            >
              {expandedId === item._id ? '−' : '+'}
            </button>
          </div>

          {/* Quick Info */}
          <div className="px-4 py-3 grid grid-cols-2 gap-2 text-xs border-b">
            <div>
              <span className="text-gray-600">Type: </span>
              <span className="font-semibold">{formatValue(item.processingType)}</span>
            </div>
            <div>
              <span className="text-gray-600">Color: </span>
              <span className="font-semibold">{formatValue(item.color)}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Customer: </span>
              <span className="font-semibold">{formatValue(item.customerName)}</span>
            </div>
          </div>

          {/* Expandable Details */}
          {expandedId === item._id && (
            <div className="px-4 py-3 space-y-4 bg-white">
              {Object.entries(FIELD_CONFIG).map(([key, section]) => (
                <div key={key}>
                  <h4 className="font-bold text-sm mb-2 text-gray-700 border-b pb-1">
                    {section.label}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {section.fields.map((field) => (
                      <div key={field.key} className="flex justify-between text-xs">
                        <span className="text-gray-600">{field.label}:</span>
                        <span className="font-semibold text-right flex-1 ml-2">
                          {field.type === 'date'
                            ? formatDate(item[field.key])
                            : formatValue(item[field.key])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Detailed expandable table section (for large screens when expanded)
  const DetailsSection = () => (
    <div className="hidden lg:block mt-6 space-y-4">
      {expandedId && results.map((item) => {
        if (item._id !== expandedId) return null;

        return (
          <div key={item._id} className="border-2 border-blue-300 rounded-lg overflow-hidden bg-blue-50">
            <div className="bg-blue-100 px-6 py-3 border-b-2 border-blue-300">
              <h3 className="font-bold text-lg">
                Full Details: {formatValue(item.sampleCode)} - {formatValue(item.sampleItemCode)}
              </h3>
            </div>

            <div className="px-6 py-4">
              {Object.entries(FIELD_CONFIG).map(([key, section]) => (
                <div key={key} className="mb-6">
                  <h4 className="font-bold text-base mb-3 text-gray-700 border-b-2 border-gray-300 pb-2">
                    {section.label}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {section.fields.map((field) => (
                      <div key={field.key} className="text-sm">
                        <span className="text-gray-600">{field.label}:</span>
                        <div className="font-semibold text-gray-800 mt-1">
                          {field.type === 'date'
                            ? formatDate(item[field.key])
                            : formatValue(item[field.key])}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <LargeScreenTable />
      <SmallScreenCards />
      <DetailsSection />
    </div>
  );
}
