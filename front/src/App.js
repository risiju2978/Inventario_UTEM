import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { HomeComponent } from "./components/HomeComponet";
import UserComponent from "./components/UserComponent/UserComponent";
import { MenuComponent } from "./components/NavBarComponent/Menu";
import ArticuloComponent from "./components/ArticuloComponent/ArticuloComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import RegistrarUserComponent from "./components/RegistrarUserComponent/RegistrarUserComponent";
import { ProtectedRoutes } from "./components/common/ProtectedComponente";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route element={<MenuComponent />}>
            <Route path="/" element={<HomeComponent />}></Route>
            <Route path="/home" element={<HomeComponent />}></Route>
            <Route path="/articulo" element={<ArticuloComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="*" element={<h1>Not Found</h1>}></Route>
            <Route element={<ProtectedRoutes redirecTo={"/"} />}>
              <Route path="/admin" element={<UserComponent />}></Route>
              <Route
                path="/admin/registrar"
                element={<RegistrarUserComponent />}
              ></Route>
              <Route path="/admin/usuario" element={<UserComponent />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
