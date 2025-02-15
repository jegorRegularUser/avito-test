import axios from "axios";
import { Ad } from "./types.ts";

const API_BASE_URL = "http://localhost:3000/items";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getAds = async (): Promise<Ad[]> => {
  const response = await apiClient.get<Ad[]>("/");
  return response.data;
};

export const getAdById = async (id: string): Promise<Ad> => {
  const response = await apiClient.get<Ad>(`/${id}`);
  return response.data;
};

export const createAd = async (adData: FormData): Promise<Ad> => {
  const response = await apiClient.post<Ad>("", adData);
  return response.data;
};

export const updateAd = async (id: string, adData: FormData): Promise<Ad> => {
  const response = await apiClient.put<Ad>(`/${id}`, adData);
  return response.data;
};

export const deleteAd = async (id: string): Promise<void> => {
  await apiClient.delete(`/${id}`);
};

export const mockAds: Ad[] = [
    {
        id: "1",
        name: "Просторная квартира в центре",
        description: "Светлая и уютная квартира в центре города. Вся инфраструктура в шаговой доступности.",
        location: "Москва, ул. Тверская, д. 10",
        type: "Недвижимость",
        propertyType: "Квартира",
        area: 75,
        rooms: 3,
        price: 12000000,
        image: "https://via.placeholder.com/150",
    },
    {
        id: "2",
        name: "Автомобиль BMW X5",
        description: "Продаётся BMW X5 в отличном состоянии, не битый, не крашеный.",
        location: "Санкт-Петербург, Невский проспект, д. 15",
        type: "Авто",
        brand: "BMW",
        model: "X5",
        year: 2019,
        mileage: 60000,
        price: 3500000,
        image: "https://via.placeholder.com/150",
    },
    {
        id: "3",
        name: "Услуги сантехника",
        description: "Профессиональный сантехник с 10-летним стажем. Установка, ремонт, диагностика.",
        location: "Екатеринбург, ул. Ленина, д. 5",
        type: "Услуги",
        serviceType: "Сантехнические работы",
        experience: 10,
        cost: 1500,
        workSchedule: "09:00 - 20:00",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "4",
        name: "Дом в Подмосковье",
        description: "Отличный загородный дом с большим участком. Тихое место, свежий воздух.",
        location: "Московская область, деревня Зеленая, д. 12",
        type: "Недвижимость",
        propertyType: "Дом",
        area: 120,
        rooms: 5,
        price: 18000000,
        image: "https://via.placeholder.com/150",
    },
    {
        id: "5",
        name: "Toyota Camry 2020",
        description: "Надёжный автомобиль в отличном состоянии. Один владелец, сервисная книжка.",
        location: "Казань, ул. Баумана, д. 7",
        type: "Авто",
        brand: "Toyota",
        model: "Camry",
        year: 2020,
        mileage: 40000,
        price: 2800000,
        image: "https://via.placeholder.com/150",
    },
    {
        id: "6",
        name: "Ремонт квартир под ключ",
        description: "Ремонт любой сложности. Гарантия качества. Опыт работы 15 лет.",
        location: "Новосибирск, ул. Советская, д. 22",
        type: "Услуги",
        serviceType: "Ремонт квартир",
        experience: 15,
        cost: 3000,
        workSchedule: "08:00 - 22:00",
        image: "https://via.placeholder.com/150",
    },
];

// export const uploadMockData = async (): Promise<void> => {
//   for (const ad of mockAds) {
//     const formData = new FormData();
//     Object.keys(ad).forEach(key => {
//       formData.append(key, ad[key]);
//     });
//     await createAd(formData);
//   }
// };

