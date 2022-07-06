import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

export async function getBlockList(page: number, unit: number) {
  const response = await axios.get(`/block/list/${page}?unit=${unit}`);
  console.log(response.data);
  return response.data;
}
