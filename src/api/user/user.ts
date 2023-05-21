import { User } from "../../types/User";
import { sendRequest } from "../request";

interface UserResponse {
  user: User
}

type Data = {
  email: string;
  password: string;
}

export const getLogin = async (data: Data): Promise<UserResponse>  => {
  try {
    const { email, password } = data;
    const res = await sendRequest({
      url: "/users/login",
      method: "post",
      data: {
        user: { email, password },
      },
    }) as UserResponse;
    return res;
  } catch (error) {
    throw new Error("nope");
  }
};

export const setNewUser = async (data: User): Promise<UserResponse> => {
  try {
    const { email, password, username } = data;
    const res = await sendRequest({
      url: "/users/",
      method: "post",
      data: {
        user: { username, email, password },
      },
    }) as UserResponse;
    return res;
  } catch (error) {
    throw new Error("nope");
  }
};

export const UpdateUserInfo = async ({ data, token }: { data: User; token: string | null }): Promise<UserResponse>  => {
  try {
    const { email, password, username, image } = data;
    const res = await sendRequest({
      url: "/user",
      method: "put",
      data: {
        user: { username, email, password, image },
      },
      token,
    }) as UserResponse;
    return res;
  } catch (error) {
    throw new Error("nope");
  }
};