import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

import Index from "./components/products/Index";
//importer le sweetalert installer via la  => commande npm install sweetalert2;
import Swal from "sweetalert2/dist/sweetalert2.js"
import "sweetalert2/dist/sweetalert2.css"
window.Swal=Swal
const toast = Swal.mixin({
    toast:true ,
    position : 'top-end',
    showConfirmButton : false ,
    timer:3000,
    timerProgressBar : true  ,

})
window.toast = toast
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("app")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
