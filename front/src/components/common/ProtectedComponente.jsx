import { Navigate, Outlet } from 'react-router-dom'

export const  ProtectedRoutes = ({admin, auth, children, redirecTo}) => {

    if(admin === false){
        return <Navigate to={redirecTo} />
    } 
        return <Outlet />
    
}