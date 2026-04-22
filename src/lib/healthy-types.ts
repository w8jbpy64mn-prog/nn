export type PackageCategory = 'chicken' | 'mixed' | 'mixed_plus';
export type MealTag = 'chicken' | 'mixed' | 'mixed_plus' | 'breakfast' | 'snack' | 'buffet';

export type SubscriptionPackage = {
  id: string;
  name: string;
  category: PackageCategory;
  days: number;
  mealsPerDay: number;
  snacksPerDay: number;
  price: number;
  description: string;
  active: boolean;
  displayOrder: number;
};

export type MealItem = {
  id: string;
  nameAr: string;
  nameEn: string;
  image: string;
  tags: MealTag[];
  subscriptionEligible: boolean;
  buffetEligible: boolean;
  buffetPrice?: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  weightGrams: number;
  description: string;
  ingredients: string;
  allergens: string;
  available: boolean;
  displayOrder: number;
};

export type CustomerStatus = 'active' | 'paused' | 'expired';

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  packageId: string;
  days: number;
  mealsPerDay: number;
  snacksPerDay: number;
  startDate: string;
  endDate: string;
  specialNotes: string;
  allergies: string;
  forbiddenFoods: string;
  address: string;
  locationUrl: string;
  status: CustomerStatus;
  internalNotes: string;
  usedDays: number;
  selectedMeals: number;
  selectedSnacks: number;
  token: string;
  tokenActive: boolean;
};

export type OrderStatus =
  | 'pending'
  | 'in_preparation'
  | 'prepared'
  | 'packed'
  | 'ready_for_delivery'
  | 'out_for_delivery'
  | 'delivered'
  | 'delivery_failed';

export type Order = {
  id: string;
  customerId: string;
  date: string;
  meals: string[];
  snack?: string;
  notes: string;
  allergy: string;
  deliveryTime: string;
  status: OrderStatus;
};

export type NoticeTarget = 'customer' | 'admin';

export type Notice = {
  id: string;
  target: NoticeTarget;
  title: string;
  body: string;
  createdAt: string;
  customerId?: string;
};

export type HealthyState = {
  siteName: string;
  logoText: string;
  packages: SubscriptionPackage[];
  meals: MealItem[];
  customers: Customer[];
  orders: Order[];
  notices: Notice[];
};
