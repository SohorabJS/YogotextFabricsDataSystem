import './globals.css'

export const metadata = {
  title: 'YOGOTEX FABRICS - Data System',
  description: 'Fabric data management dashboard for textile operations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <main>{children}</main>
      </body>
    </html>
  )
}
