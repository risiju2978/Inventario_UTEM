import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeComponent } from "./components/HomeComponet";
import UserComponent from "./components/UserComponent/UserComponent";
import { MenuComponent } from "./components/NavBarComponent/Menu";
import ArticuloComponent from "./components/ArticuloComponent/ArticuloComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import RegistrarUserComponent from "./components/RegistrarUserComponent/RegistrarUserComponent";
import { ProtectedRoutes } from "./components/common/ProtectedComponente";
import { useEffect, useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [rol, setRol] = useState(false);
  const userLocal = JSON.parse(localStorage.getItem("USER_APP"));

  useEffect(() => {
    if (userLocal) {
      const auth = localStorage.getItem("MY_AUTH_APP");
      if (auth === "true") {
        setIsLogged(true);
      }
      if (userLocal.rol === 1 || userLocal.rol === 2 ) {
        setRol(true);
      }
    }
  }, [isLogged, rol, userLocal]);

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
            <Route
              path="/admin"
              element={<ProtectedRoutes admin={rol} auth={isLogged} />}
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
