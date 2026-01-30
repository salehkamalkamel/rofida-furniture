export type Measurements = {
  width: string;
  height: string;
  depth: string;
  weight: string;
  unit: "cm" | "mm" | "inch";
};

export type ProductColor = {
  name: string;
  hex: string;
};

export type FormData = {
  sku: string;
  name: string;
  nameEn: string;
  slug: string;
  briefDescription: string;
  detailedDescription: string;
  price: string;
  salePrice: string;
  isOnOffer: boolean;
  label: string;
  stockStatus: "in_stock" | "out_of_stock" | "pre_order" | "limited";
  categoryId: string;
  buildTime: string;
  isCustomizable: boolean;
  availableStatus: "active" | "draft" | "archived";
  measurements: Measurements;
  colors: ProductColor[];
  images: string[];
};
