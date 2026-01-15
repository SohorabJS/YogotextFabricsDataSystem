import DashboardLayout from '@/components/DashboardLayout';

export const metadata = {
  title: 'Settings - YOGOTEX FABRICS',
  description: 'Configure application settings',
};

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configure application settings</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8 border border-gray-100">
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">⚙️ Settings Module</p>
            <p className="text-sm mt-2">Content will be added here</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
