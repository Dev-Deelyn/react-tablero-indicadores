import { apiClient } from "config/Axios";
import Dashboard from "types/Dashboard";
import { DataResponse } from "types/Response";
import responseFormatter from "utils/responseFormatter";

export const sendCreateDashboard = async (dashboard: any) => {
  return (await responseFormatter(apiClient.post('/dashboard', dashboard))).data
}

export const getAllDashboards = async (): Promise<DataResponse<Dashboard[]>> => {
  return await responseFormatter(apiClient.get('/dashboard/get-all'));
}