'use client';

import { useEffect, useMemo, useState } from 'react';
import { healthyStore } from '@/lib/healthy-store';
import { HealthyState } from '@/lib/healthy-types';

export function ClientPortal({ token }: { token: string }) {
  const [state, setState] = useState<HealthyState | null>(null);
  const info = useMemo(() => (state ? healthyStore.customerByToken(token) : null), [state, token]);
  const [selectedMealIds, setSelectedMealIds] = useState<string[]>([]);
  const [selectedSnackIds, setSelectedSnackIds] = useState<string[]>([]);

  useEffect(() => {
    setState(healthyStore.read());
  }, []);

  if (!state) return <p className="p-6">Loading...</p>;
  if (!info) return <div className="p-8 text-center" dir="rtl">الرابط غير صحيح أو غير موجود.</div>;

  const { customer, totals, plan } = info;

  if (!customer.tokenActive || customer.status !== 'active' || totals.remainingDays <= 0) {
    return <div className="p-8 text-center" dir="rtl">الاشتراك غير نشط حاليًا. راجع الإدارة للتجديد أو التفعيل.</div>;
  }

  const allowedMeals = healthyStore.customerAllowedMeals(customer, state.meals);
  const snackItems = allowedMeals.filter((meal) => meal.tags.includes('snack'));

  const toggleId = (id: string, list: string[], setter: (arr: string[]) => void, max: number) => {
    if (list.includes(id)) setter(list.filter((item) => item !== id));
    else if (list.length < max) setter([...list, id]);
  };

  const submitSelections = () => {
    const next = healthyStore.submitClientSelection(token, {
      meals: selectedMealIds.length,
      snacks: selectedSnackIds.length,
    });

    if (next) {
      setState(next);
      setSelectedMealIds([]);
      setSelectedSnackIds([]);
    }
  };

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 lg:p-8" dir="rtl">
      <section className="executive-card">
        <h1 className="text-3xl font-bold">أهلًا {customer.name}</h1>
        <p className="mt-1 text-zinc-300">{plan?.name} — من {customer.startDate} إلى {customer.endDate}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-zinc-900/70 p-3">الأيام المتبقية: <b>{totals.remainingDays}</b></div>
          <div className="rounded-xl bg-zinc-900/70 p-3">الوجبات المتبقية: <b>{totals.remainingMeals}</b></div>
          <div className="rounded-xl bg-zinc-900/70 p-3">السناكات المتبقية: <b>{totals.remainingSnacks}</b></div>
        </div>
      </section>

      <section className="executive-card">
        <h2 className="mb-3 text-xl font-semibold">اختياراتي — الوجبات</h2>
        <p className="mb-3 text-sm text-zinc-300">يمكنك اختيار حتى {Math.min(customer.mealsPerDay, totals.remainingMeals)} وجبة في كل إرسال.</p>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {allowedMeals.filter((meal) => !meal.tags.includes('snack')).map((meal) => (
            <button key={meal.id} onClick={() => toggleId(meal.id, selectedMealIds, setSelectedMealIds, Math.min(customer.mealsPerDay, totals.remainingMeals))} className={`rounded-xl border p-3 text-right ${selectedMealIds.includes(meal.id) ? 'border-emerald-500 bg-emerald-700/20' : 'border-zinc-700 bg-zinc-900/60'}`}>
              <img src={meal.image} alt={meal.nameAr} className="mb-2 h-24 w-full rounded-lg object-cover" />
              <p className="font-semibold">{meal.nameAr}</p>
              <p className="text-xs text-zinc-300">{meal.calories} kcal | P {meal.protein} C {meal.carbs} F {meal.fat}</p>
              <p className="text-xs text-zinc-400">المكونات: {meal.ingredients}</p>
            </button>
          ))}
        </div>
      </section>

      {customer.snacksPerDay > 0 && (
        <section className="executive-card">
          <h2 className="mb-3 text-xl font-semibold">اختيارات السناك</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {snackItems.map((meal) => (
              <button key={meal.id} onClick={() => toggleId(meal.id, selectedSnackIds, setSelectedSnackIds, Math.min(customer.snacksPerDay, totals.remainingSnacks))} className={`rounded-xl border p-3 text-right ${selectedSnackIds.includes(meal.id) ? 'border-emerald-500 bg-emerald-700/20' : 'border-zinc-700 bg-zinc-900/60'}`}>
                <p className="font-semibold">{meal.nameAr}</p>
                <p className="text-xs text-zinc-300">الحساسية: {meal.allergens}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="executive-card">
        <h2 className="mb-3 text-xl font-semibold">الإشعارات</h2>
        {state.notices.filter((n) => n.target === 'customer' && n.customerId === customer.id).map((notice) => (
          <div key={notice.id} className="mb-2 rounded-xl border border-zinc-700 p-3">
            <p className="font-medium">{notice.title}</p>
            <p className="text-sm text-zinc-300">{notice.body}</p>
          </div>
        ))}
      </section>

      <button onClick={submitSelections} disabled={selectedMealIds.length === 0 && selectedSnackIds.length === 0} className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold disabled:opacity-50">
        حفظ اختياراتي
      </button>
    </main>
  );
}
