import { api } from "./api";

export async function GetFriends(){
    const x = await api("users")
    return x;
}