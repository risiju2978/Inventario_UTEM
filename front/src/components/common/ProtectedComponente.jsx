import { Navigate, Outlet } from 'react-router-dom'

//TODO Pendiente revisar 
export const  ProtectedRoutes = ({admin, auth, children, redirecTo}) => {

    if(admin === false){
        return <Navigate to={redirecTo} />
    } 
        return <Outlet />
    
}