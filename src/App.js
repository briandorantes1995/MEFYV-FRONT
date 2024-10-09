import React from "react";
import {Route, Routes} from "react-router-dom";
import {MenuLayout} from "./components/structure"
import Home from "./components/Home/Home";
import Factura from "./components/Factura/CrearFactura";
import Login from "./components/login/login";
import Registro from "./components/registro/registro";
import Reportes from "./components/Factura/Reportes";
import "./App.css"
function App() {

  return (
      <Routes >
        <Route element={<MenuLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/crearRemisiones" element={<Factura/>}/>
          <Route path="/reportes" element={<Reportes/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Registro/>}/>
      </Routes>
  );
}

export default App;
