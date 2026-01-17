import DashboardLayout from '@/components/DashboardLayout';
import SampleSearch from '@/components/SampleSearch';

export const metadata = { title: 'Mercerise Samples - Fabrics' };

export default function MercerisePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-black">Mercerise / Semi-Mercerise Sample Data</h1>
          <p className="text-black">Search and view mercerise sample records</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border text-black">
          <SampleSearch apiPath="/api/SamplesData/mercerise" title="Mercerise Samples" />
        </div>
      </div>
    </DashboardLayout>
  );
}
