'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const user = String(form.get('email'));
    const pass = String(form.get('password'));

    if (user === 'admin@healthytime.sa' && pass === 'HealthyTime@2026') {
      document.cookie = 'chef_admin_session=ok; path=/; max-age=2592000';
      router.push('/admin');
      return;
    }

    setError('بيانات الدخول غير صحيحة.');
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-4" dir="rtl">
      <form onSubmit={onSubmit} className="executive-card w-full space-y-4">
        <h1 className="text-2xl font-bold">دخول الإدارة</h1>
        <p className="text-sm text-zinc-300">رابط خاص بالإدارة فقط.</p>
        <input name="email" type="email" required className="w-full rounded-lg bg-zinc-900 p-3" placeholder="البريد الإلكتروني" />
        <input name="password" type="password" required className="w-full rounded-lg bg-zinc-900 p-3" placeholder="كلمة المرور" />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded-xl bg-emerald-600 p-3 font-semibold">تسجيل الدخول</button>
      </form>
    </main>
  );
}
