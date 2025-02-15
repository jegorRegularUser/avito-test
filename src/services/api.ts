import axios from "axios";
import { Ad } from "./types";

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


