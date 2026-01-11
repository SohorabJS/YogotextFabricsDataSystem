import './globals.css'

export const metadata = {
  title: 'Yogotext Fabrics - Data System',
  description: 'Fabric data management dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <header className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded" />
              <h1 className="text-xl font-semibold">Yogotext Fabrics</h1>
            </div>
            <nav>
              <a href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Register</a>
            </nav>
          </header>

          <main>{children}</main>

          <footer className="py-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Yogotext Fabrics
          </footer>
        </div>
      </body>
    </html>
  )
}
