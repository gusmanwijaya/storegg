import axios from "axios";
import { SignInTypes, SignUpTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function setSignUp(data: SignUpTypes) {
  const URL = "auth/signup";

  const response = await axios
    .post(`${ROOT_API}/${API_VERSION}/${URL}`, data)
    .catch((error) => error.response);
  const axiosResponse = response.data;

  if (axiosResponse?.error === 1) {
    return axiosResponse;
  }

  return axiosResponse.data;
}

export async function setSignIn(data: SignInTypes) {
  const URL = "auth/signin";

  const response = await axios
    .post(`${ROOT_API}/${API_VERSION}/${URL}`, data)
    .catch((error) => error.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }

  const res = {
    error: false,
    message: "Login Berhasil",
    data: response.data.data,
  };

  return res;
}
