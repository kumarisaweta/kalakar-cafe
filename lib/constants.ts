export const menuCategories = [
  "All",
  "Coffee",
  "Chai",
  "Food",
  "Desserts",
] as const;

export type MenuCategory = (typeof menuCategories)[number];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<MenuCategory, "All">;
  tag?: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Kalakar Espresso",
    description: "Double shot, hand-pulled with artisan precision",
    price: 180,
    category: "Coffee",
    tag: "Signature",
  },
  {
    id: "2",
    name: "Monsoon Malabar",
    description: "Single origin, earthy notes with chocolate finish",
    price: 220,
    category: "Coffee",
  },
  {
    id: "3",
    name: "Saffron Latte",
    description: "Creamy latte infused with Kashmiri saffron",
    price: 280,
    category: "Coffee",
    tag: "Premium",
  },
  {
    id: "4",
    name: "Masala Chai",
    description: "Slow-brewed with cardamom, ginger & star anise",
    price: 150,
    category: "Chai",
    tag: "Classic",
  },
  {
    id: "5",
    name: "Rose Petal Chai",
    description: "Delicate floral notes with organic rose petals",
    price: 170,
    category: "Chai",
  },
  {
    id: "6",
    name: "Butter Chicken Wrap",
    description: "Tandoori chicken in rich makhani sauce",
    price: 320,
    category: "Food",
  },
  {
    id: "7",
    name: "Truffle Mushroom Toast",
    description: "Sourdough with wild mushrooms & truffle oil",
    price: 290,
    category: "Food",
  },
  {
    id: "8",
    name: "Gulab Jamun Cheesecake",
    description: "Fusion dessert with rose syrup drizzle",
    price: 260,
    category: "Desserts",
    tag: "Must Try",
  },
  {
    id: "9",
    name: "Dark Chocolate Kulfi",
    description: "Hand-churned kulfi with 70% dark chocolate",
    price: 200,
    category: "Desserts",
  },
];
