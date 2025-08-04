import {api} from "../config/axios.ts";
import {isAxiosError} from "axios";
import type {ProfileForm, User} from "../types";

export async function getUser(){
    try {
        const {data} = await api.get<User>("/user");
        return data;
    }catch (error) {
        if (isAxiosError(error)){
            throw new Error(error.response?.data.message || "Error al obtener el usuario");
        }
    }
}
export async function updateProfile(dataForm: ProfileForm){
    try {
        const {data} = await api.patch("/user", dataForm);
        return data;
    }catch (error) {
        if (isAxiosError(error)){
            throw new Error(error.response?.data.message || "Error al obtener el usuario");
        }
    }
}
