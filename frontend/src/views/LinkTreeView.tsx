import {type ChangeEvent, useEffect, useState} from 'react';
import {social} from '../data/social';
import DevTreeInput from '../components/DevTreeInput';
import {isValidUrl} from '../utils';
import {toast} from 'sonner';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateProfile} from "../api/DevTreeAPI.ts";
import type {SocialNetwork, User} from "../types";

export default function LinkTreeView() {

    const [devTreeLinks, setDevTreeLinks] = useState(social);

    const queryClient = useQueryClient();
    const user: User = queryClient.getQueryData(['user']);

    const {mutate} = useMutation({
        mutationFn: updateProfile,
        onError: (error: Error) => {
            toast.error(error.message || 'Error al actualizar el perfil');
        },
        onSuccess: (data) => {
            toast.success(data.message);
            // Aquí podrías actualizar el estado global o hacer algo más

        }
    })

    useEffect(() => {
        //cargar los links del usuario si existen
        const updatedData = devTreeLinks.map(item => {
            const userLink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name);
            if (userLink) {
                return {...item, url: userLink.url, enabled: userLink.enabled};
            }
            return item;
        })
        setDevTreeLinks(updatedData);
    }, []);

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const updateLinks = devTreeLinks.map(link => link.name === name ? {...link, url: value} : link)
        setDevTreeLinks(updateLinks)

    }
    const links: SocialNetwork[] = JSON.parse(user.links);


    const handleSwitchChange = (social: string) => {
        const updateLinks = devTreeLinks.map(link => {
                if (link.name === social) {
                    if (isValidUrl(link.url)) {
                        return {...link, enabled: !link.enabled};
                    } else {
                        toast.error(`La URL de ${link.name} no es válida`);
                    }
                }
                return link
            }
        );

        setDevTreeLinks(updateLinks)

        let updatedItems: SocialNetwork[] = []


        const selectSocialNetwork = updateLinks.find(link => link.name === social);
        if (selectSocialNetwork?.enabled){
            const id = links.filter(link => link.id).length + 1;
            if(links.some(links => links.name === social)){
                updatedItems = links.map(link => {
                    if (link.name === social) {
                        return {...link, enabled: true, id};
                    }
                    return link;
                })
            }else{
                const newItem = {
                    ...selectSocialNetwork,
                    id
                }
                updatedItems = [...links, newItem]
            }
        }else{
            const indexToUpdate = links.findIndex(link => link.name === social);
            updatedItems = links.map(link=> {
                if (link.name === social) {
                    return {...link, enabled: false, id: 0};
                } else if (link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
                    return {
                        ...link,
                        id: link.id - 1
                    }
                }else{
                    return link;
                }
            })
        }

        //Almancenar en base de datos
        queryClient.setQueriesData(['user'], (oldData: User) => {
            if (oldData) {
                return {
                    ...oldData,
                    links: JSON.stringify(updatedItems)

                };
            }
            return oldData;
        })

    }

    return (
        <div className='space-y-5'>
            {devTreeLinks.map(item => (
                <DevTreeInput
                    key={item.name}
                    item={item}
                    handleUrlChange={handleUrlChange}
                    handleSwitchChange={handleSwitchChange}
                />
            ))}
            <button
                className='bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold '
                onClick={() => mutate(queryClient.getQueryData(['user'])!)}
            >
                Guardar Cambios
            </button>
        </div>
    )
}
