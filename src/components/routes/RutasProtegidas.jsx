import { Navigate } from "react-router-dom";

const RutasProtegidas = ({children}) => {
    // logica para ver si mostrar las rutas protegidas o no
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario")) || null;

    if(!usuarioLogueado){
        return <Navigate to={"/login"}></Navigate>;
    }else{
        return children;
    }
};

export default RutasProtegidas;