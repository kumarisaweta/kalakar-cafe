export interface MenuItem {
  id: number;
  category: "Hot Beverages" | "Cold Beverages" | "Food" | "Desserts";
  name: string;
  price: number;
  description: string;
  longDescription: string;
  ingredients: string[];
  image: string;
  prepTime: string;
  calories: number;
}

export const menuCategories = [
  "All",
  "Hot Beverages",
  "Cold Beverages",
  "Food",
  "Desserts",
] as const;

export type MenuCategory = (typeof menuCategories)[number];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    category: "Hot Beverages",
    name: "Espresso",
    price: 120,
    description: "Bold single shot of pure arabica perfection",
    longDescription:
      "A concentrated shot of our premium arabica beans, expertly extracted to deliver intense flavor with a rich crema.",
    ingredients: ["Premium arabica beans", "Filtered water"],
    image: "/images/menu/espresso.png",
    prepTime: "3 min",
    calories: 5,
  },
  {
    id: 2,
    category: "Hot Beverages",
    name: "Cappuccino",
    price: 180,
    description: "Velvety foam over rich espresso",
    longDescription:
      "Classic Italian cappuccino with equal parts espresso, steamed milk, and silky foam art on top.",
    ingredients: ["Espresso", "Steamed milk", "Milk foam", "Cocoa dust"],
    image: "/images/menu/cappuccino.png",
    prepTime: "5 min",
    calories: 120,
  },
  {
    id: 3,
    category: "Hot Beverages",
    name: "Masala Chai",
    price: 80,
    description: "Traditional Indian spiced tea brewed to perfection",
    longDescription:
      "Aromatic blend of black tea simmered with cardamom, cinnamon, ginger, and cloves.",
    ingredients: ["Black tea", "Milk", "Cardamom", "Cinnamon", "Ginger", "Cloves"],
    image: "/images/menu/masalachai.png",
    prepTime: "7 min",
    calories: 90,
  },
  {
    id: 4,
    category: "Hot Beverages",
    name: "Mocha",
    price: 220,
    description: "Espresso meets Belgian chocolate heaven",
    longDescription:
      "Decadent blend of rich espresso, premium Belgian dark chocolate, and steamed milk, topped with whipped cream.",
    ingredients: ["Espresso", "Belgian chocolate", "Steamed milk", "Whipped cream"],
    image: "/images/menu/mocha.png",
    prepTime: "6 min",
    calories: 250,
  },
  {
    id: 5,
    category: "Hot Beverages",
    name: "Kahwa",
    price: 150,
    description: "Kashmiri green tea with saffron and almonds",
    longDescription:
      "Traditional Kashmiri tea infused with green cardamom, saffron strands, and crushed almonds.",
    ingredients: ["Kashmiri green tea", "Saffron", "Cardamom", "Almonds", "Cinnamon"],
    image: "/images/menu/kahwa.png",
    prepTime: "8 min",
    calories: 60,
  },
  {
    id: 6,
    category: "Hot Beverages",
    name: "Kulhad Chai",
    price: 90,
    description: "Authentic chai served in traditional clay cups",
    longDescription:
      "Our signature masala chai served piping hot in handcrafted clay kulhads, adding an earthy aroma.",
    ingredients: ["Black tea", "Whole milk", "Indian spices", "Jaggery"],
    image: "/images/menu/kulhad.png",
    prepTime: "8 min",
    calories: 110,
  },
  {
    id: 7,
    category: "Hot Beverages",
    name: "Latte",
    price: 200,
    description: "Smooth espresso with creamy steamed milk",
    longDescription:
      "Silky smooth latte crafted with a double shot of espresso and perfectly steamed milk, finished with delicate latte art.",
    ingredients: ["Double espresso", "Steamed milk", "Light foam"],
    image: "/images/menu/latte.png",
    prepTime: "5 min",
    calories: 180,
  },
  {
    id: 8,
    category: "Hot Beverages",
    name: "Lemon Chai",
    price: 70,
    description: "Refreshing black tea with zesty lemon",
    longDescription:
      "Light and refreshing black tea infused with fresh lemon, ginger, and honey.",
    ingredients: ["Black tea", "Fresh lemon", "Ginger", "Honey"],
    image: "/images/menu/lemonchai.png",
    prepTime: "5 min",
    calories: 40,
  },
  {
    id: 9,
    category: "Cold Beverages",
    name: "Cold Brew",
    price: 240,
    description: "18-hour slow steeped coffee perfection",
    longDescription:
      "Coarse ground beans steeped in cold water for 18 hours, creating smooth, low-acid coffee with naturally sweet notes.",
    ingredients: ["Cold brew concentrate", "Filtered water", "Ice"],
    image: "/images/menu/coldbrew.png",
    prepTime: "2 min",
    calories: 15,
  },
  {
    id: 10,
    category: "Cold Beverages",
    name: "Dalgona Coffee",
    price: 260,
    description: "Whipped coffee cloud over chilled milk",
    longDescription:
      "Instagram-famous whipped coffee with fluffy foam made from instant coffee, sugar, and water, served over ice-cold milk.",
    ingredients: ["Instant coffee", "Sugar", "Hot water", "Cold milk", "Ice"],
    image: "/images/menu/dalgona.png",
    prepTime: "8 min",
    calories: 200,
  },
  {
    id: 11,
    category: "Food",
    name: "Club Sandwich",
    price: 280,
    description: "Triple-layered classic with all the fixings",
    longDescription:
      "Three layers of toasted bread loaded with grilled vegetables, cheese, fresh lettuce, tomatoes, and signature sauce.",
    ingredients: ["Multigrain bread", "Grilled veggies", "Cheese", "Lettuce", "Tomato", "Mayo"],
    image: "/images/menu/sandwich.png",
    prepTime: "12 min",
    calories: 450,
  },
  {
    id: 12,
    category: "Food",
    name: "Arrabbiata Pasta",
    price: 340,
    description: "Spicy Italian pasta in zesty tomato sauce",
    longDescription:
      "Al dente penne pasta tossed in house-made arrabbiata sauce with garlic, chili, and fresh basil. Topped with parmesan.",
    ingredients: ["Penne pasta", "Tomato sauce", "Garlic", "Red chili", "Basil", "Parmesan"],
    image: "/images/menu/pasta.png",
    prepTime: "15 min",
    calories: 520,
  },
  {
    id: 13,
    category: "Food",
    name: "Cheese Maggi",
    price: 140,
    description: "Childhood favorite with extra cheese love",
    longDescription:
      "Classic Maggi noodles cooked with vegetables, masala, and topped with melted cheese.",
    ingredients: ["Maggi noodles", "Masala", "Vegetables", "Mozzarella cheese", "Butter"],
    image: "/images/menu/maggi.png",
    prepTime: "10 min",
    calories: 380,
  },
  {
    id: 14,
    category: "Food",
    name: "Samosa Chaat",
    price: 120,
    description: "Crispy samosas crushed with tangy chutneys",
    longDescription:
      "Two crispy samosas topped with yogurt, tamarind chutney, green chutney, onions, sev, and fresh coriander.",
    ingredients: ["Samosa", "Yogurt", "Tamarind chutney", "Mint chutney", "Sev", "Onions"],
    image: "/images/menu/samosa.png",
    prepTime: "8 min",
    calories: 320,
  },
  {
    id: 15,
    category: "Food",
    name: "Garlic Bread",
    price: 180,
    description: "Toasted bread with garlic butter and herbs",
    longDescription:
      "Crusty bread brushed with garlic-infused butter, sprinkled with mixed herbs and melted mozzarella cheese.",
    ingredients: ["Artisan bread", "Garlic", "Butter", "Herbs", "Mozzarella"],
    image: "/images/menu/garlicbread.png",
    prepTime: "10 min",
    calories: 290,
  },
  {
    id: 16,
    category: "Food",
    name: "Peri Peri Fries",
    price: 160,
    description: "Crispy golden fries with spicy peri peri seasoning",
    longDescription:
      "Hand-cut potato fries fried to golden perfection and tossed in special peri peri spice blend.",
    ingredients: ["Potatoes", "Peri peri seasoning", "Sea salt", "Mayo dip"],
    image: "/images/menu/fries.png",
    prepTime: "10 min",
    calories: 380,
  },
  {
    id: 17,
    category: "Desserts",
    name: "Chocolate Brownie",
    price: 180,
    description: "Warm fudgy brownie with vanilla ice cream",
    longDescription:
      "Decadent dark chocolate brownie served warm with a scoop of vanilla bean ice cream and chocolate sauce drizzle.",
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Flour", "Vanilla ice cream"],
    image: "/images/menu/brownie.png",
    prepTime: "5 min",
    calories: 420,
  },
  {
    id: 18,
    category: "Desserts",
    name: "New York Cheesecake",
    price: 240,
    description: "Creamy classic with berry compote",
    longDescription:
      "Rich and creamy New York style cheesecake on a buttery graham cracker crust, topped with fresh mixed berry compote.",
    ingredients: ["Cream cheese", "Graham crackers", "Sugar", "Eggs", "Mixed berries"],
    image: "/images/menu/cheesecake.png",
    prepTime: "5 min",
    calories: 380,
  },
  {
    id: 19,
    category: "Desserts",
    name: "Gulab Jamun",
    price: 130,
    description: "Soft khoya dumplings in rose-cardamom syrup",
    longDescription:
      "Two soft, melt-in-mouth gulab jamuns soaked in fragrant rose and cardamom flavored sugar syrup.",
    ingredients: ["Khoya", "Flour", "Sugar syrup", "Rose water", "Cardamom"],
    image: "/images/menu/gulabjamun.png",
    prepTime: "3 min",
    calories: 290,
  },
  {
    id: 20,
    category: "Desserts",
    name: "Belgian Waffle",
    price: 220,
    description: "Crispy waffle with chocolate and ice cream",
    longDescription:
      "Golden Belgian waffle topped with Belgian chocolate sauce, vanilla ice cream, fresh fruits, and powdered sugar.",
    ingredients: ["Waffle batter", "Belgian chocolate", "Vanilla ice cream", "Fresh fruits"],
    image: "/images/menu/waffle.png",
    prepTime: "8 min",
    calories: 460,
  },
];