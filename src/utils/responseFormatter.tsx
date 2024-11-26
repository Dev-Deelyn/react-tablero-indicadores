import { AxiosError, AxiosResponse } from "axios"
import { DataResponse } from "types/Response"

export default async (callback: Promise<AxiosResponse<any, any>>) => {
  const result: DataResponse<any> = {};

  try {
    const response: AxiosResponse = await callback;
    if (response.status) {
      const data = response.data.data;
      result.data = data;
      result.status = response.status;
      result.success = true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      result.error = error.response?.data.error;
      result.status = error.response?.status;
      result.success = false;
    }
  }

  return result;
}