import Link from 'next/link';

export default function SampleMenu() {
  const items = [
    { label: 'Regular Sample Data', href: '/fabrics/regular' },
    { label: 'Padding Sample Data', href: '/fabrics/padding' },
    { label: 'Heat Setting Sample Data', href: '/fabrics/heat-setting' },
    { label: 'Mercerise/Semi-Mercerise Sample Data', href: '/fabrics/mercerise' },
    { label: "T-verson Sample Data", href: '/fabrics/tversion' },
    { label: 'Master Song Development Data', href: '/fabrics/master-song-development' },
  ];

  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="px-4 py-2 transition-all hover:text-blue-50 bg-blue-200 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-500"
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
