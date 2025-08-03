export interface PromotionData {
  promoCode: string;
  description: string;
  expiryDate: string;
  price: number;
}

export type DeliveryFormData = {
  firstName: string;
  city: string;
  phoneNumber: string;
  emailAddress: string;
  companyName?: string;
  streetAddress?: string;
  apartment?: string;
};

export interface CardInfo {
  isValid: boolean;
  error: string | null;
}
