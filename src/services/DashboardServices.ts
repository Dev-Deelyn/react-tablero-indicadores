const serverUrl = import.meta.env.VITE_APP_SERVER_URL

export const sendCreateDashboard = async (dashboard: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Cookie", "'PHPSESSID=icsu336ovruqd6frgtohafg2ck; cookiesession1=1CAE0A889TMVUATCVIGQDPLVINJW630F'; PHPSESSID=amfkqk5m5669mkgucq68vtafp8; cookiesession1=1CAE0A88NJVNFUISR2KRKV6LLRQN530D");
  // myHeaders.append("X-authorization-token", "65ce3dfc3a3644aa");

  const requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(dashboard),
  };

  try {
    const response = await fetch(`${serverUrl}/dashboard`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return console.error(error);
  }
}

export const getAllDashboards = async () => {
  try {
    const response = await fetch(`${serverUrl}/dashboard/get-all`);
    const result = await response.json();
    return result;
  } catch (error) {
    return console.error(error);
  }
}