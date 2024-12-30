import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
export const ProtectRoutes = ()=>{
    const {user} = useAuth()
    return user ? <Outlet/> : <Navigate to='/login'/>
}