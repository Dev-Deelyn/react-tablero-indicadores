import { apiClient } from "config/Axios";
import { DataResponse } from "types/Response";
import Sections from "types/Sections";
import responseFormatter from "utils/responseFormatter";

export const sendCreateSection = async (section: any) => {
  return (await responseFormatter(apiClient.post('/sections/add', section))).data;
};

export const getAllSections = async (): Promise<DataResponse<Sections[]>> => {
  return await responseFormatter(apiClient.get('/sections/get-all'));
};

export const sendEditSection = async (sectionId: string, newKeyname?: string, show?: boolean) => {
  const payload: any = {};
  if (newKeyname !== undefined) payload.newKeyname = newKeyname;
  if (show !== undefined) payload.show = show;

  return (await responseFormatter(apiClient.post(`/sections/edit/${sectionId}`, payload))).data;
};

// SectionsServices.ts
export const sendDeleteSection = async (sectionId: string) => {
  return (await responseFormatter(apiClient.delete(`/sections/delete/${sectionId}`))).data;
};


// export const getAllSections

// export const addSection