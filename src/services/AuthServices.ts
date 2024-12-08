import { apiClient } from "config/Axios"
import { DataResponse } from "types/Response";
import User from "types/User";
import responseFormatter from "utils/responseFormatter";

export const sendAuthLogin = async (username: string, password: string): Promise<DataResponse<User>> => {
  const response = await responseFormatter(apiClient.post('/auth/login', { username, password }));
  if (response.success) {
    const token: string = response.data.access_token;
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const resUser = await responseFormatter(apiClient.get('/user'));

    if (resUser.success) {
      const user: User = resUser.data;
      user.token = token;
      localStorage.setItem('user', JSON.stringify(user));
      response.data = user;
    } else {
      response.error = resUser.error;
    }
  }
  return response;
}