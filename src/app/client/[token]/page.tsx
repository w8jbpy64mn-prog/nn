import { ClientPortal } from '@/components/client/client-portal';

export default async function ClientPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <ClientPortal token={token} />;
}
