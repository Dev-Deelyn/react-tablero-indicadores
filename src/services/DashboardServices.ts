import { apiClient } from "config/Axios";
import Dashboard from "types/Dashboard";
import { DataResponse } from "types/Response";
import responseFormatter from "utils/responseFormatter";

export const sendCreateDashboard = async (dashboard: any) => {
  return (await responseFormatter(apiClient.post('/dashboard', dashboard))).data;
};

export const getAllDashboards = async (): Promise<DataResponse<Dashboard[]>> => {
  return await responseFormatter(apiClient.get('/dashboard/get-all'));
};

export const sendEditDashboard = async ( currentKeyname: string, newKeyname?: string, show?: boolean ) => {
  // Se construye dinámicamente el payload, incluyendo solo los campos que tengan valor
  const payload: any = { currentKeyname };
  if (newKeyname !== undefined) payload.newKeyname = newKeyname;
  if (show !== undefined) payload.show = show;

  return (await responseFormatter(apiClient.put('/dashboard/edit', payload))).data;
};
