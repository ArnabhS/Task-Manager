

import Dashboard from '@/components/Dashboard';

export default function DashboardPage({ params }) {
  return <Dashboard userId={params.userId} />;
}
