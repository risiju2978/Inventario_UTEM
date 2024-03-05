import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeComponent } from "./components/HomeComponet";
import { DashboardComponent } from "./components/DashboardComponent";
import { MenuComponent } from "./components/Menu";
import ArticuloComponent from "./components/ArticuloComponent/ArticuloComponent";
function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <MenuComponent />
      </div>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeComponent />}></Route>
            <Route path="/home" element={<HomeComponent />}></Route>
            <Route path="/dashboard" element={<DashboardComponent />}></Route>
            <Route path="/articulo" element={<ArticuloComponent />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
