const API_ROOT = process.env.API_ROOT || "http://localhost:3000/";

export const Globals = {
    user: null,
    errors: [],
    deleteError(i){
        this.errors.splice(i, 1);
    }
}

export function login(){
    Globals.user = { name: "Bernie" }
}

export async function api(url, data){
    let response = null;
    if(!data){
        response = await fetch(API_ROOT + url);
    }else{
        response = await fetch(API_ROOT + url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
    }
    if(!response.ok){
        throw await response.json();
    }
    return await response.json();
}