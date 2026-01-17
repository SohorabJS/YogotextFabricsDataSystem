import DashboardLayout from '@/components/DashboardLayout';
import SampleSearch from '@/components/SampleSearch';

export const metadata = { title: 'T-Version Samples - Fabrics' };

export default function TVersionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">T-version Sample Data</h1>
          <p className="text-gray-600">Search and view T-version sample records</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <SampleSearch apiPath="/api/SamplesData/tversion" title="T-version Samples" />
        </div>
      </div>
    </DashboardLayout>
  );
}
