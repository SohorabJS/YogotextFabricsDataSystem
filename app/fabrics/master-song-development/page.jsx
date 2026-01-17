import DashboardLayout from '@/components/DashboardLayout';
import SampleSearch from '@/components/SampleSearch';

export const metadata = { title: 'Master Song Development - Fabrics' };

export default function MasterSongPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Master Song Development Data</h1>
          <p className="text-gray-600">Search and view master song development samples</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <SampleSearch apiPath="/api/SamplesData/master-song-development" title="Master Song Development" />
        </div>
      </div>
    </DashboardLayout>
  );
}
