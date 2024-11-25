import { apiClient } from "config/Axios";
import { DataResponse } from "types/Response";
import User, { UserForm } from "types/User";
import responseFormatter from "utils/responseFormatter";

export const sendCreateUser = async (user: UserForm) => {
  return (await responseFormatter(apiClient.post('/user', user))).data
}

export const getAllUsers = async (): Promise<DataResponse<User[]>> => {
  return await responseFormatter(apiClient.get('/user/get-all'));
}