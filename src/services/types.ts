export type AdType = "Недвижимость" | "Авто" | "Услуги";

export interface AdBase {
  id: string;
  name: string;
  description: string;
  location: string;
  type: AdType;
  [key: string]: any;
}

export interface RealEstateAd extends AdBase {
  type: "Недвижимость";
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface CarAd extends AdBase {
  type: "Авто";
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface ServiceAd extends AdBase {
  type: "Услуги";
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

export type Ad = RealEstateAd | CarAd | ServiceAd;
