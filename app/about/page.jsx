import DashboardLayout from '@/components/DashboardLayout';

export const metadata = {
  title: 'About Us - YOGOTEX FABRICS',
  description: 'Learn about YOGOTEX FABRICS',
};

export default function AboutPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
          <p className="text-gray-600 mt-2">Information about YOGOTEX FABRICS</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8 border border-gray-100">
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">ℹ️ About Us Module</p>
            <p className="text-sm mt-2">Content will be added here</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
