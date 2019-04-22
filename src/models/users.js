import { api, Globals } from "./api";

export async function GetFriends(){
    const x = await api("users")
    return x;
}

export const GetFriends2 = () => api("users");

export async function Register(data){
    const x = await api("users", data)
    return x;
}
export async function Login(data){
    const x = await api("users/login", data)
    Globals.user = x.user;
    Globals.token = x.token;
    return x;
}
export async function oAuthLogin(token, fbid){
    const x = await api("users/facebookLogin", { token })
    Globals.user = x.user;
    Globals.token = x.token;
    Globals.oAuthUser = x.oAuthUser;
    return x;
}
