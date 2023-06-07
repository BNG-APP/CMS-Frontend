
const ROOT_URL = ""

const getHeaders = () => {
  const defaultHeaders = {
    'Content-Type': 'multipart/form-data',
    "accept": 'application/json'
  };

  return defaultHeaders;
}

export async function GET(path, data, options = {}) {

  const headers = {
    ...getHeaders()
  };

  const response = await fetch(path, {
    method: "GET",
    ...(data) && { params: data },
    headers
  });

  const res = await response.json()
  return res
}

export async function POST(path, data, options = {}) {
const op=window.localStorage.getItem("op")
  const headers = {
     defaultlanguage:"",
   operatorid: op,
    timezone: "+1",
    ...getHeaders()
  };
 
  const response = await fetch(path, {
    method: "POST",
    ...options,
    body: JSON.stringify(data),
    headers,
  })
  return response.json();
}