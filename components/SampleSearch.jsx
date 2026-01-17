'use client';

import { useState } from 'react';

export default function SampleSearch({ apiPath, title = 'Samples' }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('code');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e?.preventDefault();
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (type === 'code') params.set('code', query);
      if (type === 'customer') params.set('customer', query);

      const res = await fetch(`${apiPath}?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResults(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <form onSubmit={handleSearch} className="flex gap-2 w-full">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border text-gray-50 transition-all bg-blue-500 rounded px-2 py-1 outline-0 hover:bg-blue-800"
          >
            <option value="code">Sample Code</option>
            <option value="customer">Customer Name</option>
          </select>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by code or customer"
            className="flex-1 border rounded px-3 py-1 outline-0 hover:bg-gray-100 transition-all hover:p-1.5"
          />

          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-800 transition-all"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <div className="space-y-3">
        {results.length === 0 && <div className="text-gray-500">No results</div>}

        {results.map((r, idx) => (
          <div key={r._id || idx} className="border rounded p-3 bg-white">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{r.sampleCode || r.sample_code || '—'}</div>
                <div className="text-sm text-gray-600">{r.sampleItemCode || r.sampleItemCode || ''}</div>
                <div className="text-sm">{r.processingType || ''}</div>
              </div>
              <div className="text-sm text-gray-500 text-right">
                <div>Customer: {r.customerName || r.customer || '—'}</div>
                <div>Issue: {r.sampleIssueDate ? new Date(r.sampleIssueDate).toLocaleDateString() : '—'}</div>
                <div>Finish: {r.finishingDate ? new Date(r.finishingDate).toLocaleDateString() : '—'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
