import {Navigate} from "react-router-dom";
import {useQuery} from '@tanstack/react-query';
import {getUser} from "../api/DevTreeAPI.ts";
import DevTree from "../components/DevTree.tsx";

export default function AppLayout() {

    const {data, isLoading, isError} = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
    })

    if (isLoading) return 'Cargando...';
    if (isError) return <Navigate to="/auth/login" replace={true}/>
    if (data) return <DevTree data={data}/>;
}
