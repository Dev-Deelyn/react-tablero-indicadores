import { UserForm } from "types/User";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL

export const sendCreateUser = async (user: UserForm) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Cookie", "'PHPSESSID=icsu336ovruqd6frgtohafg2ck; cookiesession1=1CAE0A889TMVUATCVIGQDPLVINJW630F'; PHPSESSID=amfkqk5m5669mkgucq68vtafp8; cookiesession1=1CAE0A88NJVNFUISR2KRKV6LLRQN530D");
  // myHeaders.append("X-authorization-token", "65ce3dfc3a3644aa");

  const requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${serverUrl}/user`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return console.error(error);
  }
}

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${serverUrl}/user/get-all`);
    const result = await response.json();
    return result;
  } catch (error) {
    return console.error(error);
  }
}