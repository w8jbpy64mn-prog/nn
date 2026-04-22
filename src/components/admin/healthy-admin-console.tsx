'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { healthyStore } from '@/lib/healthy-store';
import { CustomerStatus, HealthyState, OrderStatus, SubscriptionPackage } from '@/lib/healthy-types';

const tabs = ['الملخص', 'العملاء', 'الباقات', 'الوجبات', 'التحضير', 'التغليف', 'التوصيل', 'الإشعارات'] as const;

type Tab = (typeof tabs)[number];

export function HealthyAdminConsole() {
  const [state, setState] = useState<HealthyState | null>(null);
  const [tab, setTab] = useState<Tab>('الملخص');
  const [linkCopied, setLinkCopied] = useState('');

  useEffect(() => {
    setState(healthyStore.read());
  }, []);

  const activeCustomers = useMemo(
    () => state?.customers.filter((customer) => customer.status === 'active').length ?? 0,
    [state],
  );

  if (!state) return <p className="p-6">Loading...</p>;

  const addCustomer = (formData: FormData) => {
    const packageId = String(formData.get('packageId'));
    const pack = state.packages.find((item) => item.id === packageId);
    if (!pack) return;

    const status = String(formData.get('status')) as CustomerStatus;
    const { state: nextState } = healthyStore.addCustomer({
      name: String(formData.get('name')),
      phone: String(formData.get('phone')),
      email: String(formData.get('email')),
      packageId,
      days: Number(formData.get('days')),
      mealsPerDay: Number(formData.get('mealsPerDay')),
      snacksPerDay: Number(formData.get('snacksPerDay')),
      startDate: String(formData.get('startDate')),
      endDate: String(formData.get('endDate')),
      specialNotes: String(formData.get('specialNotes')),
      allergies: String(formData.get('allergies')),
      forbiddenFoods: String(formData.get('forbiddenFoods')),
      address: String(formData.get('address')),
      locationUrl: String(formData.get('locationUrl')),
      status,
      internalNotes: String(formData.get('internalNotes')),
    });
    setState(nextState);
  };

  const savePackage = (formData: FormData) => {
    const item: SubscriptionPackage = {
      id: String(formData.get('id')) || `pkg-${crypto.randomUUID().slice(0, 6)}`,
      name: String(formData.get('name')),
      category: String(formData.get('category')) as SubscriptionPackage['category'],
      days: Number(formData.get('days')),
      mealsPerDay: Number(formData.get('mealsPerDay')),
      snacksPerDay: Number(formData.get('snacksPerDay')),
      price: Number(formData.get('price')),
      description: String(formData.get('description')),
      active: formData.get('active') === 'on',
      displayOrder: Number(formData.get('displayOrder')),
    };

    setState(healthyStore.upsertPackage(item));
  };

  const updateOrder = (orderId: string, status: OrderStatus) => setState(healthyStore.setOrderStatus(orderId, status));

  const copyClientLink = async (token: string) => {
    const link = `${window.location.origin}/client/${token}`;
    await navigator.clipboard.writeText(link);
    setLinkCopied(token);
    setTimeout(() => setLinkCopied(''), 1500);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-8 lg:px-8" dir="rtl">
      <div className="executive-card">
        <p className="text-sm text-emerald-300">لوحة إدارة تشغيلية — Healthy Time</p>
        <h1 className="mt-2 text-3xl font-bold">{state.siteName}</h1>
        <p className="mt-2 text-zinc-300">إدارة الاشتراكات، الوجبات، روابط العملاء، التحضير، التغليف والتوصيل من شاشة واحدة.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-zinc-900/60 p-3">العملاء النشطين: <b>{activeCustomers}</b></div>
          <div className="rounded-xl bg-zinc-900/60 p-3">الباقات: <b>{state.packages.length}</b></div>
          <div className="rounded-xl bg-zinc-900/60 p-3">الوجبات: <b>{state.meals.length}</b></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`rounded-xl px-4 py-2 text-sm ${tab === item ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
            {item}
          </button>
        ))}
      </div>

      {tab === 'الملخص' && (
        <div className="executive-card space-y-4">
          <h2 className="text-xl font-semibold">مراجعة سريعة</h2>
          <ul className="list-disc space-y-2 pr-5 text-zinc-200">
            <li>رابط الإدارة المستقل: <Link className="text-emerald-300 underline" href="/admin">/admin</Link></li>
            <li>رابط العميل الخاص يتم إنشاؤه لكل عميل ويمكن إيقافه أو تفعيله.</li>
            <li>فلترة الوجبات حسب نوع الباقة (دجاج / منوع / منوع بلس).</li>
            <li>احتساب تلقائي لإجمالي/متبقي الوجبات والسناكات والأيام.</li>
          </ul>
        </div>
      )}

      {tab === 'العملاء' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <form action={addCustomer} className="executive-card space-y-3">
            <h2 className="text-xl font-semibold">إضافة عميل</h2>
            <input required name="name" placeholder="الاسم" className="w-full rounded-lg bg-zinc-900 p-2" />
            <input required name="phone" placeholder="رقم الجوال" className="w-full rounded-lg bg-zinc-900 p-2" />
            <input name="email" placeholder="الإيميل" className="w-full rounded-lg bg-zinc-900 p-2" />
            <select name="packageId" className="w-full rounded-lg bg-zinc-900 p-2">
              {state.packages.map((pack) => <option value={pack.id} key={pack.id}>{pack.name}</option>)}
            </select>
            <div className="grid grid-cols-3 gap-2">
              <input type="number" name="days" placeholder="عدد الأيام" defaultValue={24} className="rounded-lg bg-zinc-900 p-2" />
              <input type="number" name="mealsPerDay" placeholder="وجبات يومية" defaultValue={2} className="rounded-lg bg-zinc-900 p-2" />
              <input type="number" name="snacksPerDay" placeholder="سناك يومي" defaultValue={1} className="rounded-lg bg-zinc-900 p-2" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" name="startDate" className="rounded-lg bg-zinc-900 p-2" />
              <input type="date" name="endDate" className="rounded-lg bg-zinc-900 p-2" />
            </div>
            <textarea name="specialNotes" placeholder="ملاحظات خاصة" className="w-full rounded-lg bg-zinc-900 p-2" />
            <input name="allergies" placeholder="الحساسية" className="w-full rounded-lg bg-zinc-900 p-2" />
            <input name="forbiddenFoods" placeholder="أكلات ممنوعة" className="w-full rounded-lg bg-zinc-900 p-2" />
            <input name="address" placeholder="العنوان" className="w-full rounded-lg bg-zinc-900 p-2" />
            <input name="locationUrl" placeholder="رابط اللوكيشن" className="w-full rounded-lg bg-zinc-900 p-2" />
            <select name="status" className="w-full rounded-lg bg-zinc-900 p-2">
              <option value="active">نشط</option>
              <option value="paused">موقوف</option>
              <option value="expired">منتهي</option>
            </select>
            <textarea name="internalNotes" placeholder="ملاحظات داخلية" className="w-full rounded-lg bg-zinc-900 p-2" />
            <button className="rounded-lg bg-emerald-600 px-4 py-2 font-medium">حفظ وإنشاء الرابط</button>
          </form>

          <div className="executive-card overflow-auto">
            <h2 className="mb-3 text-xl font-semibold">قائمة العملاء وروابطهم</h2>
            <table className="w-full text-right text-sm">
              <thead className="text-zinc-400">
                <tr><th>الاسم</th><th>الحالة</th><th>الرابط</th><th>التحكم</th></tr>
              </thead>
              <tbody>
                {state.customers.map((customer) => {
                  const totalMeals = customer.days * customer.mealsPerDay;
                  const totalSnacks = customer.days * customer.snacksPerDay;
                  return (
                    <tr key={customer.id} className="border-t border-zinc-800">
                      <td className="py-2">{customer.name}<p className="text-xs text-zinc-400">{customer.phone}</p></td>
                      <td>{customer.status}</td>
                      <td>
                        <button onClick={() => copyClientLink(customer.token)} className="text-emerald-300 underline">نسخ الرابط</button>
                        {linkCopied === customer.token && <span className="mr-2 text-xs text-emerald-200">تم النسخ</span>}
                      </td>
                      <td>
                        <button onClick={() => setState(healthyStore.toggleToken(customer.id, !customer.tokenActive))} className="rounded bg-zinc-800 px-2 py-1">
                          {customer.tokenActive ? 'إيقاف الرابط' : 'تفعيل الرابط'}
                        </button>
                        <p className="mt-1 text-xs text-zinc-400">وجبات {customer.selectedMeals}/{totalMeals} | سناك {customer.selectedSnacks}/{totalSnacks}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'الباقات' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <form action={savePackage} className="executive-card space-y-3">
            <h2 className="text-xl font-semibold">إضافة / تعديل باقة</h2>
            <input name="id" placeholder="معرف الباقة (اختياري)" className="w-full rounded-lg bg-zinc-900 p-2" />
            <input required name="name" placeholder="اسم الباقة" className="w-full rounded-lg bg-zinc-900 p-2" />
            <select required name="category" className="w-full rounded-lg bg-zinc-900 p-2">
              <option value="chicken">دجاج</option><option value="mixed">منوع</option><option value="mixed_plus">منوع بلس</option>
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" required name="days" placeholder="الأيام" className="rounded-lg bg-zinc-900 p-2" />
              <input type="number" required name="mealsPerDay" placeholder="وجبات يومية" className="rounded-lg bg-zinc-900 p-2" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" required name="snacksPerDay" placeholder="سناك يومي" className="rounded-lg bg-zinc-900 p-2" />
              <input type="number" required name="price" placeholder="السعر" className="rounded-lg bg-zinc-900 p-2" />
            </div>
            <input type="number" required name="displayOrder" placeholder="ترتيب الظهور" className="w-full rounded-lg bg-zinc-900 p-2" />
            <textarea required name="description" placeholder="وصف" className="w-full rounded-lg bg-zinc-900 p-2" />
            <label className="flex items-center gap-2"><input type="checkbox" name="active" defaultChecked /> مفعلة</label>
            <button className="rounded-lg bg-emerald-600 px-4 py-2">حفظ الباقة</button>
          </form>
          <div className="executive-card">
            <h3 className="mb-3 text-lg">الباقات الحالية</h3>
            {state.packages.map((pack) => (
              <div key={pack.id} className="mb-3 rounded-xl border border-zinc-700 p-3">
                <p className="font-semibold">{pack.name}</p>
                <p className="text-sm text-zinc-300">{pack.days} يوم | {pack.mealsPerDay} وجبة يوميًا | {pack.snacksPerDay} سناك</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'الوجبات' && (
        <div className="executive-card">
          <h2 className="text-xl font-semibold">منيو الاشتراكات والبوفيه</h2>
          <p className="mb-4 text-zinc-300">إدارة الصور، السعرات، القيم الغذائية، وربط الأصناف بالباقات.</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {state.meals.map((meal) => (
              <article key={meal.id} className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-3">
                <img src={meal.image} alt={meal.nameAr} className="mb-2 h-32 w-full rounded-lg object-cover" />
                <h3 className="font-semibold">{meal.nameAr}</h3>
                <p className="text-xs text-zinc-300">{meal.nameEn}</p>
                <p className="mt-1 text-xs">{meal.calories} kcal | P {meal.protein} | C {meal.carbs} | F {meal.fat}</p>
                <p className="mt-1 text-xs text-zinc-400">الفئات: {meal.tags.join('، ')}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {tab === 'التحضير' && (
        <OrderStage title="قسم التحضير" orders={healthyStore.ordersByStage(state, ['pending', 'in_preparation', 'prepared'])} state={state} onUpdate={updateOrder} nextStatus="prepared" nextLabel="تم التحضير" />
      )}

      {tab === 'التغليف' && (
        <OrderStage title="قسم التغليف" orders={healthyStore.ordersByStage(state, ['prepared', 'packed'])} state={state} onUpdate={updateOrder} nextStatus="ready_for_delivery" nextLabel="جاهز للتوصيل" />
      )}

      {tab === 'التوصيل' && (
        <div className="executive-card space-y-3">
          <h2 className="text-xl font-semibold">قسم التوصيل</h2>
          {healthyStore.ordersByStage(state, ['ready_for_delivery', 'out_for_delivery', 'delivery_failed']).map((order) => {
            const customer = state.customers.find((item) => item.id === order.customerId);
            return (
              <div key={order.id} className="rounded-xl border border-zinc-700 p-3">
                <p className="font-semibold">{customer?.name}</p>
                <p className="text-sm text-zinc-300">{customer?.phone} — {customer?.address}</p>
                <div className="mt-2 flex gap-2">
                  <a href={customer?.locationUrl} target="_blank" className="rounded bg-zinc-800 px-2 py-1 text-xs">فتح اللوكيشن</a>
                  <a href={`tel:${customer?.phone}`} className="rounded bg-zinc-800 px-2 py-1 text-xs">اتصال مباشر</a>
                  <button onClick={() => updateOrder(order.id, 'out_for_delivery')} className="rounded bg-amber-600 px-2 py-1 text-xs">خرج للتوصيل</button>
                  <button onClick={() => updateOrder(order.id, 'delivered')} className="rounded bg-emerald-600 px-2 py-1 text-xs">تم التسليم</button>
                  <button onClick={() => updateOrder(order.id, 'delivery_failed')} className="rounded bg-red-700 px-2 py-1 text-xs">تعذر التسليم</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'الإشعارات' && (
        <div className="executive-card">
          <h2 className="mb-3 text-xl font-semibold">الإشعارات</h2>
          {state.notices.map((notice) => (
            <div key={notice.id} className="mb-2 rounded-xl border border-zinc-700 p-3">
              <p className="font-medium">[{notice.target}] {notice.title}</p>
              <p className="text-sm text-zinc-300">{notice.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function OrderStage({
  title,
  orders,
  state,
  onUpdate,
  nextStatus,
  nextLabel,
}: {
  title: string;
  orders: HealthyState['orders'];
  state: HealthyState;
  onUpdate: (orderId: string, status: OrderStatus) => void;
  nextStatus: OrderStatus;
  nextLabel: string;
}) {
  return (
    <div className="executive-card space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      {orders.map((order) => {
        const customer = state.customers.find((item) => item.id === order.customerId);
        return (
          <div key={order.id} className="rounded-xl border border-zinc-700 p-3">
            <p className="font-semibold">{customer?.name}</p>
            <p className="text-sm text-zinc-300">الحالة: {order.status}</p>
            <p className="text-sm text-zinc-300">الحساسية: {order.allergy || customer?.allergies || 'لا يوجد'}</p>
            <button onClick={() => onUpdate(order.id, nextStatus)} className="mt-2 rounded bg-emerald-600 px-2 py-1 text-xs">{nextLabel}</button>
          </div>
        );
      })}
    </div>
  );
}
