 
import DashboardLayout from '@/components/DashboardLayout';
import Clock from '@/components/Clock';

export const metadata = {
  title: 'Home - YOGOTEX FABRICS',
  description: 'Welcome to YOGOTEX FABRICS Fabric Data System',
};

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      {/* Sticky Background Gradient */}
      <div className="fixed inset-0 bg-linear-to-br from-cyan-400 "></div>

      {/* Scrollable Content */}
      <DashboardLayout>
        <div className="space-y-8">
          {/* Hero / Summary Section */}
          <div className="text-fuchsia-700">
            <div className='flex items-center justify-between mb-4'>
              <h1 className=" text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 ">Welcome To YOGOTEX DENIM</h1>
              <Clock size={150} showDigital={true} dark={false} />
            </div>
            <p className="text-xl text-amber-600 mb-2 inline-block bg-black/20 backdrop-blur-sm
  px-4 py-2
  rounded-md font-bold">YOGOTEX FABRICS COM.LTD.</p>
            <p className="text-lg text-blue-600 mb-6">
              Comprehensive Fabric Data Management System - Your complete solution for textile operations
            </p>
            <p className="inline-block bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-md">
              Our advanced data system enables you to manage, track, and analyze fabric inventory and production with precision and efficiency. 
              Streamline your textile operations with real-time insights and comprehensive data analytics.
            </p>
          </div>

          {/* Key Fabric Metrics Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">📊 Key Fabric Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric Card 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <span className="text-sm text-gray-500">This Month</span>
                </div>
                <h3 className="text-gray-700 text-sm font-semibold mb-1">Total Inventory</h3>
                <p className="text-3xl font-bold text-blue-600">12,450</p>
                <p className="text-xs text-gray-500 mt-2">+5.2% from last month</p>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <span className="text-sm text-gray-500">This Month</span>
                </div>
                <h3 className="text-gray-700 text-sm font-semibold mb-1">Quality Check Pass</h3>
                <p className="text-3xl font-bold text-green-600">98.5%</p>
                <p className="text-xs text-gray-500 mt-2">Excellent performance</p>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <span className="text-sm text-gray-500">Active</span>
                </div>
                <h3 className="text-gray-700 text-sm font-semibold mb-1">Equipment Status</h3>
                <p className="text-3xl font-bold text-purple-600">45</p>
                <p className="text-xs text-gray-500 mt-2">Machines running</p>
              </div>

              {/* Metric Card 4 */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <span className="text-sm text-gray-500">YTD</span>
                </div>
                <h3 className="text-gray-700 text-sm font-semibold mb-1">Production Output</h3>
                <p className="text-3xl font-bold text-orange-600">2.5M</p>
                <p className="text-xs text-gray-500 mt-2">Units produced</p>
              </div>
            </div>
          </div>

          {/* Fabric Categories Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">🧵 Fabric Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Regular', icon: '📄', count: 1240 },
                { name: 'Head Setting', icon: '🔧', count: 580 },
                { name: 'Black Padding', icon: '⬛', count: 390 },
                { name: 'Tversio', icon: '✨', count: 670 },
              ].map((category) => (
                <div key={category.name} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer hover:scale-105">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{category.count}</p>
                  <p className="text-xs text-gray-500">Items in stock</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {[
                { name: 'B-Grad', icon: '🎨', count: 450 },
                { name: 'Mercerise', icon: '💎', count: 820 },
                { name: 'Semi-Mercerise', icon: '✨', count: 610 },
              ].map((category) => (
                <div key={category.name} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer hover:scale-105">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{category.count}</p>
                  <p className="text-xs text-gray-500">Items in stock</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">📢 Recent Updates</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Major Equipment Upgrade Completed</h3>
                    <p className="text-gray-600 mt-2">
                      Successfully upgraded 8 production units to the latest technology. Expected 15% increase in production capacity.
                    </p>
                    <p className="text-sm text-gray-500 mt-3">📅 Today at 10:30 AM</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">New</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Quality Certification Renewed</h3>
                    <p className="text-gray-600 mt-2">
                      YOGOTEX FABRICS has successfully renewed its ISO 9001:2015 certification. All quality standards verified and passed.
                    </p>
                    <p className="text-sm text-gray-500 mt-3">📅 2 days ago</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Success</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600 hover:shadow-xl transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">New Fabric Line Launch</h3>
                    <p className="text-gray-600 mt-2">
                      Introduced 5 new premium fabric variants in the Mercerise and Semi-Mercerise categories to meet market demands.
                    </p>
                    <p className="text-sm text-gray-500 mt-3">📅 1 week ago</p>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Feature</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">📊 Analytics Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Production Chart Demo */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Production Trend</h3>
                <div className="space-y-3">
                  {[
                    { month: 'January', percent: 65, value: '1.3M' },
                    { month: 'February', percent: 72, value: '1.44M' },
                    { month: 'March', percent: 78, value: '1.56M' },
                    { month: 'April', percent: 85, value: '1.7M' },
                    { month: 'May', percent: 92, value: '1.84M' },
                    { month: 'June', percent: 88, value: '1.76M' },
                  ].map((item) => (
                    <div key={item.month}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-700">{item.month}</span>
                        <span className="text-sm text-gray-600">{item.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-blue-600 to-blue-800 h-2 rounded-full"
                          style={{ width: `${item.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Chart Demo */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Category</h3>
                <div className="space-y-4">
                  {[
                    { category: 'Regular', revenue: '45%', amount: '$450K' },
                    { category: 'Mercerise', revenue: '25%', amount: '$250K' },
                    { category: 'Semi-Mercerise', revenue: '18%', amount: '$180K' },
                    { category: 'Premium', revenue: '12%', amount: '$120K' },
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-3 h-3 rounded-full ${
                          item.category === 'Regular' ? 'bg-blue-600' :
                          item.category === 'Mercerise' ? 'bg-green-600' :
                          item.category === 'Semi-Mercerise' ? 'bg-purple-600' :
                          'bg-orange-600'
                        }`}></div>
                        <span className="text-sm font-semibold text-gray-700">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{item.amount}</p>
                        <p className="text-xs text-gray-500">{item.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 text-white border border-white border-opacity-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Manage Your Fabrics?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Explore our comprehensive fabric data system and streamline your textile operations today.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/fabrics"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                >
                  📦 Browse Fabrics
                </a>
                <a
                  href="/operations"
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition border border-white"
                >
                  ⚙️ View Operations
                </a>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
