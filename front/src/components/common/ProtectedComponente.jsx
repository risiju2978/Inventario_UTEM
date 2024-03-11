import { Navigate, Outlet } from 'react-router-dom'

export const  ProtectedRoutes = ({admin, auth, children, redirecTo}) => {

    if( admin !== 1 && auth === false){
        return <Navigate to={redirecTo} />
    } 
        return <Outlet />
    
}