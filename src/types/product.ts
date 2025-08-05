export interface Promotion {
  type: "percentage" | "fixed_amount" | "buy_one_get_one_free" | "new_product" | "none";
  value?: number;
  description?: string;
}

export interface ImageProduct {
  url: string;
  alt: string;
  colorText: string;
  colorCode: string;
  isIllustration: boolean;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  sizes?: string[];
  description: string;
  category: string;
  image: ImageProduct[];
  rating: {
    rate: number;
    count: number;
  };
  promotions?: Promotion[];
  finalPrice: number;
  inStock: boolean;
}

export interface CategoryNav {
  name: {
    en: string;
    vi: string;
  };
  url: string;
}

export interface Category {
  img: string;
  title: string;
  link: string;
}

export interface AllCategory {
  name: {
    en: string;
    vi: string;
    ja: string;
    zh: string;
    ar: string;
  };
  url: string;
}

export interface ImageBanner {
  id: number;
  url: string;
  alt: string;
  link: string;
}

export interface ProductsQueryParams {
  page?: number | string;
  limit?: number | string;
  sort_by?: "created_at" | "updated_at" | "view" | "sold" | "price" | "name";
  order?: "asc" | "desc";
  exclude?: string;
  rating_filter?: number | string;
  price_max?: number | string;
  price_min?: number | string;
  name?: string;
  category?: string;
}
