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
    return 'N/A';
  }
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

function isNullValue(value) {
  return value === null || value === undefined || value === '';
}

export default function SampleResultsGrid({ results, selectedItems, onSelectItem }) {
  const [expandedId, setExpandedId] = useState(null);

  if (results.length === 0) {
    return null;
  }

  // Large screen - Table view
  const LargeScreenTable = () => (
    <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300">
            <th className="border px-3 py-2 text-left w-12">
              <input
                type="checkbox"
                checked={selectedItems.size === results.length && results.length > 0}
                onChange={() => {
                  if (selectedItems.size === results.length) {
                    const newSet = new Set(selectedItems);
                    results.forEach(r => newSet.delete(r._id));
                    onSelectItem(results[0]._id);
                  } else {
                    results.forEach(r => onSelectItem(r._id));
                  }
                }}
                className="w-4 h-4 cursor-pointer"
              />
            </th>
            <th className="border px-3 py-2 text-left text-sm font-semibold text-gray-700">Sample Code</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold text-gray-700">Item Code</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold text-gray-700">Type</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold text-gray-700">Construction</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold text-gray-700">Color</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold text-gray-700">Customer</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold text-gray-700">Issue Date</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold text-gray-700">Finish Date</th>
            <th className="border px-3 py-2 text-center text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, idx) => (
            <tr
              key={item._id}
              className={`border-b text-sm ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${selectedItems.has(item._id) ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
            >
              <td className="border px-3 py-2">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item._id)}
                  onChange={() => onSelectItem(item._id)}
                  className="w-4 h-4 cursor-pointer"
                />
              </td>
              <td className="border px-3 py-2 font-semibold text-gray-900">{formatValue(item.sampleCode)}</td>
              <td className="border px-3 py-2 text-gray-700">{formatValue(item.sampleItemCode)}</td>
              <td className="border px-3 py-2 text-gray-700 text-xs md:text-sm">{formatValue(item.processingType)}</td>
              <td className="border px-3 py-2 text-gray-700 text-xs md:text-sm truncate">{formatValue(item.construction)}</td>
              <td className="border px-3 py-2 text-gray-700">{formatValue(item.color)}</td>
              <td className="border px-3 py-2 text-gray-700 text-xs md:text-sm">{formatValue(item.customerName)}</td>
              <td className="border px-3 py-2 text-gray-700 text-xs">{formatDate(item.sampleIssueDate)}</td>
              <td className="border px-3 py-2 text-gray-700 text-xs">{formatDate(item.finishingDate)}</td>
              <td className="border px-3 py-2 text-center">
                <button
                  onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded text-xs md:text-sm font-medium transition-all"
                >
                  {expandedId === item._id ? 'Hide' : 'View'}
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
    <div className="lg:hidden space-y-3 px-2 sm:px-0">
      {results.map((item) => (
        <div
          key={item._id}
          className={`border-2 rounded-lg overflow-hidden transition-all shadow-sm ${
            selectedItems.has(item._id) ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 bg-white'
          }`}
        >
          {/* Card Header with Checkbox */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={selectedItems.has(item._id)}
                onChange={() => onSelectItem(item._id)}
                className="w-5 h-5 cursor-pointer flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 truncate">{formatValue(item.sampleCode)}</h3>
                <p className="text-xs text-gray-600 truncate">{formatValue(item.sampleItemCode)}</p>
              </div>
            </div>
            <button
              onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
              className="text-blue-600 text-base font-semibold px-2 sm:px-3 py-1 hover:bg-blue-100 rounded flex-shrink-0 transition-all"
            >
              {expandedId === item._id ? '−' : '+'}
            </button>
          </div>

          {/* Quick Info */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 grid grid-cols-2 gap-2 text-xs sm:text-sm border-b bg-white">
            <div className="min-w-0">
              <span className="text-gray-600 font-medium">Type: </span>
              <p className="font-semibold text-gray-900 truncate text-xs">{formatValue(item.processingType)}</p>
            </div>
            <div className="min-w-0">
              <span className="text-gray-600 font-medium">Color: </span>
              <p className="font-semibold text-gray-900 truncate text-xs">{formatValue(item.color)}</p>
            </div>
            <div className="col-span-2 min-w-0">
              <span className="text-gray-600 font-medium">Customer: </span>
              <p className="font-semibold text-gray-900 truncate text-xs">{formatValue(item.customerName)}</p>
            </div>
          </div>

          {/* Expandable Details */}
          {expandedId === item._id && (
            <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-4 bg-white max-h-96 overflow-y-auto">
              {Object.entries(FIELD_CONFIG).map(([key, section]) => (
                <div key={key}>
                  <h4 className="font-bold text-xs sm:text-sm mb-2 text-gray-700 border-b pb-1">
                    {section.label}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {section.fields.map((field) => (
                      <div key={field.key} className="flex justify-between text-xs sm:text-sm gap-2">
                        <span className="text-gray-600 font-medium min-w-fit">{field.label}:</span>
                        <span className={`font-semibold text-right flex-1 ${isNullValue(item[field.key]) ? 'text-red-500' : 'text-gray-900'}`}>
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
          <div key={item._id} className="border-2 border-blue-300 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-white shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 border-b-2 border-blue-300">
              <h3 className="font-bold text-lg text-white">
                Full Details: {formatValue(item.sampleCode)} - {formatValue(item.sampleItemCode)}
              </h3>
            </div>

            <div className="px-6 py-6 max-h-96 overflow-y-auto">
              {Object.entries(FIELD_CONFIG).map(([key, section]) => (
                <div key={key} className="mb-8">
                  <h4 className="font-bold text-base mb-4 text-gray-800 border-b-2 border-blue-200 pb-2 bg-gray-50 px-3 py-2 rounded">
                    {section.label}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-3">
                    {section.fields.map((field) => (
                      <div key={field.key} className="text-sm">
                        <span className="text-gray-600 font-medium block mb-1">{field.label}:</span>
                        <div className={`font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded border-l-4 border-blue-300 ${isNullValue(item[field.key]) ? 'text-red-600' : ''}`}>
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
