import { User } from "@/types";
import axios from "axios";

const pageRecord = 20;

export async function getUsers(page: number) {
  const skip = page ? page * pageRecord : 0;
  const ENDPOINT = `https://fake.newbapi.com/user/api/v1/users/?limit=${pageRecord}&skip=${skip}`;
  console.log("endpoint", ENDPOINT);
  const response = await axios.get<User[]>(ENDPOINT, {});
  console.log("endpoint -> response", response.data);
  return {
    data: response.data,
    page,
  };
}
