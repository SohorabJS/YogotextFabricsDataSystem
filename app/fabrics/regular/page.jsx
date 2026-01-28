import DashboardLayout from '@/components/DashboardLayout';
import SampleSearch from '@/components/SampleSearch';

export const metadata = {
  title: 'Regular Samples - Fabrics',
};

export default function RegularPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0 w-full">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl text-black font-bold">Regular Sample Data</h1>
          <p className="text-sm sm:text-base text-black">Search and view regular sample records</p>
        </div>

        <div className="bg-black/55 text-white p-4 sm:p-6 rounded-lg shadow-md w-full">
          <SampleSearch apiPath="/api/SamplesData/regular" title="Regular Samples" />
        </div>
      </div>
    </DashboardLayout>
  );
}
