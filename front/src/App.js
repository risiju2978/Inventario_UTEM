import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeComponent } from "./components/HomeComponet";
import UserComponent from "./components/UserComponent/UserComponent";
import { MenuComponent } from "./components/NavBarComponent/Menu";
import ArticuloComponent from "./components/ArticuloComponent/ArticuloComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import RegistrarUserComponent from "./components/RegistrarUserComponent/RegistrarUserComponent";
import { ProtectedRoutes } from "./components/common/ProtectedComponente";
import { useEffect, useState } from "react";
import { useUserContext } from "./context/UserAppContext";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [rol, setRol] = useState(false);
  const {user}  = useUserContext();
  const {isAuthenticated} = useAuthContext()
  // const userLocal = JSON.parse(localStorage.getItem("USER_APP"));

  useEffect(() => {
    if (user && isAuthenticated) {
        setIsLogged(true);
      if (user.rol === 1 || user.rol === 2) {
        setRol(true);
      }
    }
  }, [isAuthenticated, isLogged, rol, user]);

  return (
    <div className="container-fluid">
      <div>
        <MenuComponent />
      </div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeComponent />}></Route>
            <Route path="/home" element={<HomeComponent />}></Route>
            <Route path="/articulo" element={<ArticuloComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="*" element={<h1>Not Found</h1>}></Route>
            <Route element={<ProtectedRoutes admin={rol} auth={isLogged} redirecTo={"/"} />}
            >
              <Route
                path="/admin/registrar"
                element={<RegistrarUserComponent />}
              ></Route>
              <Route path="/admin/usuario" element={<UserComponent />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
