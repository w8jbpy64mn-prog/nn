'use client';

import { HEALTHY_SEED } from './healthy-seed';
import { Customer, HealthyState, MealItem, Order, OrderStatus, SubscriptionPackage } from './healthy-types';

const KEY = 'healthy_time_state_v1';

const withTotals = (customer: Customer) => {
  const totalMeals = customer.days * customer.mealsPerDay;
  const totalSnacks = customer.days * customer.snacksPerDay;

  return {
    totalMeals,
    totalSnacks,
    remainingMeals: Math.max(totalMeals - customer.selectedMeals, 0),
    remainingSnacks: Math.max(totalSnacks - customer.selectedSnacks, 0),
    remainingDays: Math.max(customer.days - customer.usedDays, 0),
  };
};

export const healthyStore = {
  read(): HealthyState {
    if (typeof window === 'undefined') return HEALTHY_SEED;

    const raw = localStorage.getItem(KEY);
    if (!raw) {
      this.write(HEALTHY_SEED);
      return HEALTHY_SEED;
    }

    try {
      return JSON.parse(raw) as HealthyState;
    } catch {
      this.write(HEALTHY_SEED);
      return HEALTHY_SEED;
    }
  },

  write(state: HealthyState) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEY, JSON.stringify(state));
  },

  reset() {
    this.write(HEALTHY_SEED);
    return HEALTHY_SEED;
  },

  addCustomer(input: Omit<Customer, 'id' | 'token' | 'tokenActive' | 'usedDays' | 'selectedMeals' | 'selectedSnacks'>) {
    const state = this.read();
    const id = `cus-${crypto.randomUUID().slice(0, 8)}`;
    const tokenBase = input.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const token = `${tokenBase || 'client'}-${Math.random().toString(36).slice(2, 7)}`;

    state.customers.unshift({
      ...input,
      id,
      token,
      tokenActive: true,
      usedDays: 0,
      selectedMeals: 0,
      selectedSnacks: 0,
    });

    state.notices.unshift({
      id: `n-${crypto.randomUUID().slice(0, 6)}`,
      target: 'admin',
      title: 'عميل جديد',
      body: `تم إنشاء عميل جديد: ${input.name}`,
      createdAt: new Date().toISOString(),
    });

    this.write(state);
    return { state, token };
  },

  upsertPackage(item: SubscriptionPackage) {
    const state = this.read();
    const index = state.packages.findIndex((pack) => pack.id === item.id);
    if (index >= 0) state.packages[index] = item;
    else state.packages.push(item);
    this.write(state);
    return state;
  },

  upsertMeal(item: MealItem) {
    const state = this.read();
    const index = state.meals.findIndex((meal) => meal.id === item.id);
    if (index >= 0) state.meals[index] = item;
    else state.meals.push(item);
    this.write(state);
    return state;
  },

  setOrderStatus(orderId: string, status: OrderStatus) {
    const state = this.read();
    state.orders = state.orders.map((order) => (order.id === orderId ? { ...order, status } : order));
    this.write(state);
    return state;
  },

  customerByToken(token: string) {
    const state = this.read();
    const customer = state.customers.find((item) => item.token === token);
    if (!customer) return null;

    const totals = withTotals(customer);
    const plan = state.packages.find((pack) => pack.id === customer.packageId);

    return { customer, totals, plan, state };
  },

  customerAllowedMeals(customer: Customer, meals: MealItem[]) {
    const plan = this.read().packages.find((p) => p.id === customer.packageId);
    if (!plan) return [];

    return meals.filter((meal) => {
      if (!meal.subscriptionEligible || !meal.available) return false;
      if (plan.category === 'chicken') return meal.tags.includes('chicken');
      if (plan.category === 'mixed') return meal.tags.includes('mixed') || meal.tags.includes('chicken');
      return meal.tags.includes('mixed_plus') || meal.tags.includes('mixed') || meal.tags.includes('chicken');
    });
  },

  submitClientSelection(token: string, payload: { meals: number; snacks: number }) {
    const state = this.read();
    const customer = state.customers.find((item) => item.token === token);
    if (!customer) return null;

    const totals = withTotals(customer);
    customer.selectedMeals = Math.min(customer.selectedMeals + payload.meals, totals.totalMeals);
    customer.selectedSnacks = Math.min(customer.selectedSnacks + payload.snacks, totals.totalSnacks);

    state.notices.unshift({
      id: `n-${crypto.randomUUID().slice(0, 6)}`,
      target: 'admin',
      title: 'اختيار وجبات جديد',
      body: `${customer.name} أكمل اختيار وجبات جديدة من الرابط الخاص به.`,
      createdAt: new Date().toISOString(),
      customerId: customer.id,
    });

    this.write(state);
    return state;
  },

  ordersByStage(state: HealthyState, statuses: OrderStatus[]) {
    return state.orders.filter((order: Order) => statuses.includes(order.status));
  },

  toggleToken(customerId: string, active: boolean) {
    const state = this.read();
    state.customers = state.customers.map((customer) =>
      customer.id === customerId ? { ...customer, tokenActive: active } : customer,
    );
    this.write(state);
    return state;
  },
};
