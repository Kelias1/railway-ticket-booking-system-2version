import axios, { AxiosResponse } from 'axios';
import { ISearchRoute, IRoute, IItem, IOrder, ISeats, IIdName } from '../models/interfaces';

interface ApiError {
  response?: {
    status: number;
    data: unknown;
  };
  message: string;
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Для поиска городов
async function getCities(city: string): Promise<AxiosResponse<IIdName[]>> {
  try {
    return await http.get(`routes/cities?name=${city}`);
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// Для поиска направления
async function getRoutes(route: ISearchRoute): Promise<AxiosResponse<IRoute>> {
	try {
			const response = await http.get(`routes?from_city_id=${route.fromCity._id}&to_city_id=${route.toCity._id}&date_start=${route.fromDate}&date_end=${route.toDate}`);
			return response;
	} catch (error) {
			handleError(error);
			throw error;
	}
}

// Последние направления
async function getLastTickets(): Promise<AxiosResponse<IItem[]>> {
  try {
    return await http.get('routes/last');
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// Билеты
async function getSeats(id: string): Promise<AxiosResponse<ISeats[]>> {
  try {
    return await http.get(`routes/${id}/seats`);
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// Заказ билетов
async function postOrder(data: IOrder): Promise<AxiosResponse> {
  try {
    return await http.post('order', data);
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// Для подписки
async function subscribeToUpdates(email: string): Promise<AxiosResponse> {
  try {
    return await http.post('subscribe', { email });
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// Чтобы показать ошибки
function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const apiError = error as ApiError;
    console.error("API call failed:", apiError.message);
    if (apiError.response) {
      console.error("Status:", apiError.response.status);
      console.error("Data:", apiError.response.data);
    }
  } else {
    console.error("Unexpected error:", error);
  }
}

export const apiService = {
  getCities,
  getRoutes,
  getLastTickets,
  getSeats,
  postOrder,
  subscribeToUpdates
};
