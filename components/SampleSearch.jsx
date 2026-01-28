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
    <div className='w-full'>
      <div className="space-y-4 w-full">
        {/* Search Form */}
        <div className="flex items-center gap-2 md:gap-3 mb-4 w-full flex-col sm:flex-row">
          <form onSubmit={handleSearch} className="flex gap-2 w-full flex-col sm:flex-row">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="text-xs sm:text-sm md:text-base bg-black/30 text-white rounded-lg md:rounded-xl hover:bg-black/20 hover:backdrop-blur-lg transition-all duration-300 px-3 py-2 md:py-3 min-w-30 sm:min-w-37"
            >
              <option value="sampleCode">Sample Code</option>
              <option value="sampleItemCode">Item Code</option>
              <option value="customerName">Customer Name</option>
            </select>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search by ${type === 'sampleCode' ? 'sample code' : type === 'sampleItemCode' ? 'item code' : 'customer name'}`}
              className="flex-1 border bg-black/35 text-white text-xs sm:text-sm md:text-base rounded-lg md:rounded-2xl hover:bg-white/10 transition-all duration-300 px-3 md:px-5 py-2 md:py-3 w-full sm:w-auto min-h-10 md:min-h-11"
            />

            <button
              type="submit"
              className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-xs sm:text-sm md:text-base text-white rounded-lg cursor-pointer hover:bg-blue-800 transition-all whitespace-nowrap w-full sm:w-auto min-h-10 md:min-h-11 font-medium"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h3 className="text-base md:text-lg font-medium">
                Results ({results.length})
              </h3>
              <label className="flex items-center gap-2 cursor-pointer text-xs md:text-sm">
                <input
                  type="checkbox"
                  checked={selectedItems.size === results.length && results.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
                <span>Select All</span>
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
          <div className="px-3 md:px-4 py-6 md:py-8 transition-all bg-blue-200 rounded-lg md:rounded-md text-xs sm:text-sm md:text-base text-gray-700 text-center font-bold">
             Enter a search query and click Search to get started
          </div>
        )}
      </div>
    </div>
  );
}
