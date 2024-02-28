import axios from "axios";
const NETWORKURL = "http://192.168.1.6:8000/api/";
const api = axios.create({
  baseURL: NETWORKURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
  },
});
export const getData = async (url) => {
  const response = await api.get(url);
  return response.data;
};

export const addData = async (url, instance) => {
  return await api.post(url, instance);
};
export const updateData = async (url, instance) => {
  return await api.patch(url, instance);
};
export const deleteData = async (url, id) => {
  return await api.delete(url, id);
};

export default api;
