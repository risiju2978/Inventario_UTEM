import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeComponent } from "./components/HomeComponet";
import UserComponent from "./components/UserComponent/UserComponent";
import { MenuComponent } from "./components/NavBarComponent/Menu";
import ArticuloComponent from "./components/ArticuloComponent/ArticuloComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";

function App() {
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
            <Route path="/usuario" element={<UserComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="*" element={<h1>Not Found</h1>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
