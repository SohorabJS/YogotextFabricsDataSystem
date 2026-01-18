import DashboardLayout from '@/components/DashboardLayout';
import SampleSearch from '@/components/SampleSearch';

export const metadata = { title: 'Heat Setting Samples - Fabrics' };

export default function HeatSettingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl text-black font-bold">Heat Setting Sample Data</h1>
          <p className="text-black">Search and view heat setting sample records</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border text-black">
          <SampleSearch apiPath="/api/SamplesData/heatSetting" title="Heat Setting Samples" />
        </div>
      </div>
    </DashboardLayout>
  );
}
