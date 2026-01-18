'use client';

import { useState } from 'react';
import SampleResultsGrid from './SampleResultsGrid';

export default function SampleSearch({ apiPath, title = 'Samples' }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('sampleCode');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());

  async function handleSearch(e) {
    e?.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedItems(new Set());

    try {
      const params = new URLSearchParams();
      params.set(type, query);

      const res = await fetch(`${apiPath}?${params.toString()}`);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch');
      }

      const data = await res.json();
      
      // Handle the response structure
      if (data.success) {
        const resultsArray = Array.isArray(data.data) ? data.data : [data.data];
        setResults(resultsArray);
        
        if (resultsArray.length === 0) {
          setError('No results found');
        }
      } else {
        setError(data.message || 'No results found');
        setResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Error fetching data');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === results.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(results.map(r => r._id)));
    }
  };

  return (
    <div>
      <div className="space-y-4">
        {/* Search Form */}
        <div className="flex items-center gap-3 mb-4">
          <form onSubmit={handleSearch} className="flex gap-2 w-full">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border text-gray-50 transition-all bg-blue-500 rounded px-3 py-2 outline-0 hover:bg-blue-800"
            >
              <option value="sampleCode">Sample Code</option>
              <option value="sampleItemCode">Item Code</option>
              <option value="customerName">Customer Name</option>
            </select>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search by ${type === 'sampleCode' ? 'sample code' : type === 'sampleItemCode' ? 'item code' : 'customer name'}`}
              className="flex-1 border rounded px-3 py-2 outline-0 hover:bg-gray-50 transition-all"
            />

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-800 transition-all whitespace-nowrap"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
            {error}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Results ({results.length})
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.size === results.length && results.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
                <span className="text-sm">Select All</span>
              </label>
            </div>
            <SampleResultsGrid
              results={results}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
            />
          </>
        )}

        {!loading && results.length === 0 && !error && (
          <div className="text-gray-500 text-center py-8">
            Enter a search query and click Search to get started
          </div>
        )}
      </div>
    </div>
  );
}
