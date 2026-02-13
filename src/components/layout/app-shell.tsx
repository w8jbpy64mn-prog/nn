import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { TopHeader } from './top-header';

export function AppShell({ children, isAdmin }: { children: ReactNode; isAdmin?: boolean }) {
  return (
    <div className="min-h-screen">
      <Sidebar isAdmin={isAdmin} />
      <TopHeader />
      <main className="px-4 pb-14 lg:ml-72">{children}</main>
    </div>
  );
}
