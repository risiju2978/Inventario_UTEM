import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserAppContext";

//TODO Pendiente revisar
export const ProtectedRoutes = ({ redirecTo }) => {
   const {isAuthenticated} = useAuthContext();
   const {user} = useUserContext();

   console.log(user)
   console.log(isAuthenticated)
   
  if ( user === null) {
    return <Navigate to={redirecTo} />;
  } else if (user.rol === 1 && isAuthenticated) {
    return <Outlet />;
  } else if (user.rol === 2 && isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={redirecTo} />;
  }
};
