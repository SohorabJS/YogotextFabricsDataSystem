import DashboardLayout from '@/components/DashboardLayout';
import SampleSearch from '@/components/SampleSearch';

export const metadata = { title: 'Padding Samples - Fabrics' };

export default function PaddingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Padding Sample Data</h1>
          <p className="text-black">Search and view padding sample records</p>
        </div>

        <div className="bg-white/10 text-black backdrop-blur-lg p-8 rounded-2xl shadow-xl">
          <SampleSearch apiPath="/api/SamplesData/padding" title="Padding Samples" />
        </div>
      </div>
    </DashboardLayout>
  );
}
