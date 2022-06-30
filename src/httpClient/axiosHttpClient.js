import axios from "axios";

export const getRequest = async url => {
  const res = await axios.get(url);
  return res;
};

export const postRequest = async (url, data) => {
  const res = await axios.post(url, data);
  return res;
};

export const putRequest = async (url, data) => {
  const res = await axios.put(url, data);
  return res;
};

export const deleteRequest = async url => {
  const res = await axios.delete(url);
  return res;
};