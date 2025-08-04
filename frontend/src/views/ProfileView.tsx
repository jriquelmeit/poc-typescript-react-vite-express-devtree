import {useForm} from 'react-hook-form'
import {toast} from "sonner";
import {useQueryClient, useMutation} from "@tanstack/react-query";
import ErrorMessage from "../components/ErrorMessages.tsx";
import type {User, ProfileForm} from "../types";
import {updateProfile} from "../api/DevTreeAPI.ts";

export default function ProfileView() {

    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<User>(['user']);

    const {register, handleSubmit, formState:{errors}} = useForm<ProfileForm>( {defaultValues: {
        handle: data?.handle, description: data?.description
    }})

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error: Error) => {
            toast.error(error.message || 'Error al actualizar el perfil');
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ['user']});
        }
    })

    const handleUserProfileForm = async (dataForm: ProfileForm) => {

        updateProfileMutation.mutate(dataForm);
    }
    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    { ...register('handle', {
                        required: 'El handle es obligatorio',
                        minLength: {
                            value: 3,
                            message: 'El handle debe tener al menos 3 caracteres'
                        },
                        maxLength: {
                            value: 20,
                            message: 'El handle no puede tener más de 20 caracteres'
                        }
                    }) }
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    { ...register('description', {
                        required: 'La descripción es obligatoria',
                        minLength: {
                            value: 10,
                            message: 'La descripción debe tener al menos 10 caracteres'
                        },
                        maxLength: {
                            value: 200,
                            message: 'La descripción no puede tener más de 200 caracteres'
                        }
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ () => {} }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}
