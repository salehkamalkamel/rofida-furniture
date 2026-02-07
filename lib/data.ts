export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  categoryId: string;
  colors: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isLimitedOffer?: boolean;
  dimensions?: string;
  material?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "beds",
    name: "سراير",
    nameEn: "beds",
    icon: "bed",
    image:
      "https://res.cloudinary.com/dz4gikdws/image/upload/v1770215967/WhatsApp_Image_2026-02-02_at_3.47.00_PM_o4r1sk.jpg",
    productCount: 124,
  },
  {
    id: "shoe_rack",
    name: "جزامات",
    nameEn: "shoe_rack",
    icon: "shoe_rack",
    image:
      "https://res.cloudinary.com/dz4gikdws/image/upload/v1770417522/WhatsApp_Image_2026-02-02_at_3.44.06_PM_lxbsyq.jpg",
    productCount: 89,
  },
  {
    id: "wardrobe",
    name: "دولاب",
    nameEn: "wardrobe",
    icon: "wardrobe",
    image:
      "https://res.cloudinary.com/dz4gikdws/image/upload/v1770050057/IMG-20260202-WA0014_agwmqc.jpg",
    productCount: 67,
  },
  {
    id: "shelves",
    name: "ارفف حائط",
    nameEn: "shelves",
    icon: "shelves",
    image:
      "https://plus.unsplash.com/premium_photo-1681810782651-e5baca274a6a?q=80&w=403&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productCount: 45,
  },
  {
    id: "accessories",
    name: "اكسسوارات",
    nameEn: "accessories",
    icon: "accessories",
    image:
      "https://res.cloudinary.com/dz4gikdws/image/upload/v1770406114/IMG-20260202-WA0074_mvq8qo.jpg",
    productCount: 38,
  },
  {
    id: "coffee corner",
    name: "كافي كورنر",
    nameEn: "coffee corner",
    icon: "coffee",
    image:
      "https://res.cloudinary.com/dz4gikdws/image/upload/v1770478338/31rsmijy9IL._AC_UF894_1000_QL80__d5f4sp.jpg",
    productCount: 52,
  },
  {
    id: "desk",
    name: "مكاتب",
    nameEn: "desk",
    icon: "desk",
    image:
      "https://images.unsplash.com/photo-1476365518243-f738bf58443d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productCount: 78,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "أريكة نورديك",
    nameEn: "NORDIK",
    description: "أريكة ثلاثية المقاعد، قماش رمادي فاتح",
    fullDescription:
      "أريكة عصرية بتصميم اسكندنافي أنيق، مصنوعة من خشب البلوط الطبيعي مع قماش عالي الجودة مقاوم للبقع. توفر راحة استثنائية للجلوس لفترات طويلة مع وسائد داعمة للظهر.",
    price: 4999,
    originalPrice: 6499,
    discount: 23,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
    ],
    category: "غرفة المعيشة",
    categoryId: "living-room",
    colors: [
      { name: "رمادي فاتح", hex: "#B8B8B8" },
      { name: "أزرق", hex: "#5B8BA0" },
      { name: "أخضر", hex: "#7D9B76" },
    ],
    rating: 4.5,
    reviewCount: 127,
    isNew: false,
    isLimitedOffer: true,
    dimensions: "220 × 90 × 85 سم",
    material: "خشب بلوط، قماش بوليستر",
    inStock: true,
  },
  {
    id: "2",
    name: "طاولة قهوة مينيمال",
    nameEn: "MINIMAL",
    description: "طاولة قهوة مستديرة، خشب طبيعي",
    fullDescription:
      "طاولة قهوة أنيقة بتصميم بسيط ومعاصر. مصنوعة من خشب الجوز الصلب مع لمسة نهائية طبيعية تبرز جمال الخشب الطبيعي.",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&h=600&fit=crop",
    ],
    category: "غرفة المعيشة",
    categoryId: "living-room",
    colors: [
      { name: "خشب طبيعي", hex: "#8B7355" },
      { name: "أسود", hex: "#2C2C2C" },
    ],
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
    dimensions: "80 × 80 × 45 سم",
    material: "خشب جوز صلب",
    inStock: true,
  },
  {
    id: "3",
    name: "كرسي طعام أوسلو",
    nameEn: "OSLO",
    description: "كرسي طعام، خشب زان وقماش",
    fullDescription:
      "كرسي طعام مريح بتصميم اسكندنافي كلاسيكي. الهيكل من خشب الزان المتين والمقعد مبطن بقماش ناعم للراحة القصوى.",
    price: 599,
    originalPrice: 799,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&h=600&fit=crop",
    ],
    category: "غرفة الطعام",
    categoryId: "dining",
    colors: [
      { name: "أبيض", hex: "#F5F5F5" },
      { name: "رمادي غامق", hex: "#4A4A4A" },
      { name: "أزرق", hex: "#5B8BA0" },
      { name: "أصفر", hex: "#E8B849" },
    ],
    rating: 4.7,
    reviewCount: 234,
    isLimitedOffer: true,
    dimensions: "45 × 52 × 82 سم",
    material: "خشب زان، قماش",
    inStock: true,
  },
  {
    id: "4",
    name: "سرير كوبنهاجن",
    nameEn: "COPENHAGEN",
    description: "سرير مزدوج مع لوح رأسي، 180×200 سم",
    fullDescription:
      "سرير فاخر بتصميم عصري أنيق. يتميز بلوح رأسي مبطن بقماش مخملي ناعم وقاعدة من خشب الصنوبر المعالج.",
    price: 3499,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
    ],
    category: "غرفة النوم",
    categoryId: "bedroom",
    colors: [
      { name: "رمادي", hex: "#8C8C8C" },
      { name: "كريمي", hex: "#F5F0E8" },
    ],
    rating: 4.9,
    reviewCount: 156,
    isNew: true,
    dimensions: "180 × 200 × 120 سم",
    material: "خشب صنوبر، قماش مخمل",
    inStock: true,
  },
  {
    id: "5",
    name: "مكتب عمل هلسنكي",
    nameEn: "HELSINKI",
    description: "مكتب عمل مع أدراج، أبيض",
    fullDescription:
      "مكتب عمل عملي وأنيق مثالي للمكتب المنزلي. يحتوي على درجين للتخزين وسطح عمل واسع.",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&h=600&fit=crop",
    ],
    category: "المكتب",
    categoryId: "office",
    colors: [
      { name: "أبيض", hex: "#FFFFFF" },
      { name: "خشب طبيعي", hex: "#C4A77D" },
    ],
    rating: 4.6,
    reviewCount: 98,
    dimensions: "140 × 60 × 75 سم",
    material: "MDF مغلف، معدن",
    inStock: true,
  },
  {
    id: "6",
    name: "دعاسة للحمام ألسترن",
    nameEn: "ALSTERN",
    description: "دعاسة للحمام، رمادي غامق، 50×80 سم",
    fullDescription:
      "ستصبح دعاسة الحمام المصنوعة من القطن الخالص باللون الرمادي الغامق هي المفضلة لديك بسهولة. يقوم نسيجها بتدليك قدميك ويجف سريعاً.",
    price: 599,
    originalPrice: 799,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
    ],
    category: "الحمام",
    categoryId: "bathroom",
    colors: [
      { name: "رمادي فاتح", hex: "#B8B8B8" },
      { name: "أزرق", hex: "#5B8BA0" },
      { name: "رمادي غامق", hex: "#4A4A4A" },
      { name: "أصفر", hex: "#E8B849" },
    ],
    rating: 4.5,
    reviewCount: 4,
    isLimitedOffer: true,
    dimensions: "50 × 80 سم",
    material: "قطن 100%",
    inStock: true,
  },
  {
    id: "7",
    name: "مصباح أرضي ستوكهولم",
    nameEn: "STOCKHOLM",
    description: "مصباح أرضي، نحاسي/أبيض",
    fullDescription:
      "مصباح أرضي أنيق بتصميم عصري. القاعدة من المعدن بلمسة نحاسية والغطاء من القماش الأبيض الناعم.",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop",
    ],
    category: "الإضاءة",
    categoryId: "lighting",
    colors: [
      { name: "نحاسي", hex: "#B87333" },
      { name: "أسود", hex: "#2C2C2C" },
    ],
    rating: 4.4,
    reviewCount: 67,
    isNew: true,
    dimensions: "ارتفاع 165 سم",
    material: "معدن، قماش",
    inStock: true,
  },
  {
    id: "8",
    name: "خزانة ملابس بيرجن",
    nameEn: "BERGEN",
    description: "خزانة ملابس بابين، أبيض",
    fullDescription:
      "خزانة ملابس واسعة بتصميم بسيط وعملي. تحتوي على رفوف قابلة للتعديل وقضيب للتعليق.",
    price: 2799,
    originalPrice: 3299,
    discount: 15,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
    ],
    category: "التخزين",
    categoryId: "storage",
    colors: [
      { name: "أبيض", hex: "#FFFFFF" },
      { name: "بلوط", hex: "#C4A77D" },
    ],
    rating: 4.3,
    reviewCount: 45,
    dimensions: "100 × 60 × 200 سم",
    material: "خشب MDF، معدن",
    inStock: true,
  },
  {
    id: "9",
    name: "كرسي حديقة مالمو",
    nameEn: "MALMO",
    description: "كرسي خارجي، خشب أكاسيا",
    fullDescription:
      "كرسي حديقة مريح مصنوع من خشب الأكاسيا المعالج للاستخدام الخارجي. مقاوم للعوامل الجوية.",
    price: 799,
    images: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop",
    ],
    category: "الخارجية",
    categoryId: "outdoor",
    colors: [{ name: "خشب طبيعي", hex: "#8B7355" }],
    rating: 4.6,
    reviewCount: 34,
    isNew: true,
    dimensions: "60 × 70 × 85 سم",
    material: "خشب أكاسيا",
    inStock: true,
  },
  {
    id: "10",
    name: "طاولة طعام فيورد",
    nameEn: "FJORD",
    description: "طاولة طعام 6 أشخاص، خشب بلوط",
    fullDescription:
      "طاولة طعام فاخرة من خشب البلوط الصلب بتصميم اسكندنافي كلاسيكي. تتسع لـ 6 أشخاص بشكل مريح.",
    price: 3999,
    originalPrice: 4799,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&h=600&fit=crop",
    ],
    category: "غرفة الطعام",
    categoryId: "dining",
    colors: [
      { name: "بلوط طبيعي", hex: "#C4A77D" },
      { name: "بلوط داكن", hex: "#5C4033" },
    ],
    rating: 4.8,
    reviewCount: 78,
    isLimitedOffer: true,
    dimensions: "180 × 90 × 75 سم",
    material: "خشب بلوط صلب",
    inStock: true,
  },
  {
    id: "11",
    name: "كومود غوتنبرغ",
    nameEn: "GOTEBORG",
    description: "كومود 3 أدراج، أبيض/خشب",
    fullDescription:
      "كومود أنيق بثلاثة أدراج واسعة. يجمع بين اللون الأبيض النظيف وتفاصيل الخشب الطبيعي.",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    ],
    category: "غرفة النوم",
    categoryId: "bedroom",
    colors: [{ name: "أبيض/خشب", hex: "#F5F5F5" }],
    rating: 4.5,
    reviewCount: 56,
    dimensions: "80 × 40 × 90 سم",
    material: "MDF، خشب صنوبر",
    inStock: true,
  },
  {
    id: "12",
    name: "رف كتب أوبسالا",
    nameEn: "UPPSALA",
    description: "رف كتب 5 طبقات، أسود",
    fullDescription:
      "رف كتب عصري بخمس طبقات مفتوحة. تصميم صناعي أنيق يجمع بين المعدن الأسود والخشب.",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    ],
    category: "التخزين",
    categoryId: "storage",
    colors: [
      { name: "أسود", hex: "#2C2C2C" },
      { name: "أبيض", hex: "#FFFFFF" },
    ],
    rating: 4.7,
    reviewCount: 89,
    isNew: true,
    dimensions: "80 × 30 × 180 سم",
    material: "معدن، خشب MDF",
    inStock: true,
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "تصميم  أصيل",
    subtitle: "اكتشف مجموعتنا الجديدة من الأثاث العصري",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=800&fit=crop",
    cta: "تسوق الآن",
    link: "/products",
  },
  {
    id: 2,
    title: "خصومات تصل إلى 30%",
    subtitle: "على مجموعة مختارة من غرف النوم",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&h=800&fit=crop",
    cta: "اكتشف العروض",
    link: "/products?category=bedroom",
  },
  {
    id: 3,
    title: "غرفة المعيشة المثالية",
    subtitle: "أثاث مريح بأسعار مناسبة",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&h=800&fit=crop",
    cta: "استعرض المجموعة",
    link: "/products?category=living-room",
  },
];
