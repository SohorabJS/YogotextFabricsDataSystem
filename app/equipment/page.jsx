import DashboardLayout from '@/components/DashboardLayout';

export const metadata = {
  title: 'Machine Tools & Equipment - YOGOTEX FABRICS',
  description: 'Manage machinery and equipment updates',
};

export default function EquipmentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Machine Tools & Equipment</h1>
          <p className="text-gray-600 mt-2">Track and manage machinery and equipment updates</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8 border border-gray-100">
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">🔧 Equipment Management Module</p>
            <p className="text-sm mt-2">Content will be added here</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
