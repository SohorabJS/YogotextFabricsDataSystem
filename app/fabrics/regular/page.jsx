import DashboardLayout from '@/components/DashboardLayout';
import SampleSearch from '@/components/SampleSearch';

export const metadata = {
  title: 'Regular Samples - Fabrics',
};

export default function RegularPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl text-black font-bold">Regular Sample Data</h1>
          <p className="text-black">Search and view regular sample records</p>
        </div>

        <div className=" bg-white/10 text-black backdrop-blur-lg p-8 rounded-2xl shadow-xl ">
          <SampleSearch apiPath="/api/SamplesData/regular" title="Regular Samples" />
        </div>
      </div>
    </DashboardLayout>
  );
}
