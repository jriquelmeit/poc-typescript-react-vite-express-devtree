import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView.tsx";
import AuthLayout from "./Layouts/AuthLayout.tsx";
import AppLayout from "./Layouts/AppLayout.tsx";
import LinkTreeView from "./views/LinkTreeView.tsx";
import ProfileView from "./views/ProfileView.tsx";
import HandleView from "./components/HandleView.tsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>}/>
                    <Route path="/auth/register" element={<RegisterView/>}/>
                </Route>
                <Route path='/admin' element={<AppLayout/>}>
                    <Route index={true} element={<LinkTreeView />}/>
                    <Route path='profile' element={<ProfileView />}/>
                </Route>
                <Route path='/:handle' element={<AuthLayout />}>
                    <Route element={<HandleView />} index={true}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
