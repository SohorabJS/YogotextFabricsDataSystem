import DashboardLayout from '@/components/DashboardLayout';
import SampleMenu from '@/components/SampleMenu';

export const metadata = {
  title: 'Fabrics Management - YOGOTEX FABRICS',
  description: 'Manage fabrics inventory and data',
};

export default function FabricsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fabrics Management</h1>
          <p className="text-gray-600 mt-2">Manage your fabric inventory and related data</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-black">Sample Data</h2>
            <p className="text-sm text-gray-500 mt-1">Browse different sample types and search records</p>
          </div>

          <SampleMenu />
        </div>
      </div>
    </DashboardLayout>
  );
}
