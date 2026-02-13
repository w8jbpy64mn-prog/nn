import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { AppShell } from '@/components/layout/app-shell';

export default function AdminPage() {
  return (
    <AppShell isAdmin>
      <AdminDashboard />
    </AppShell>
  );
}
