// Llamar a una variable de entorno
const URL_USUARIO = import.meta.env.VITE_API_USUARIO;
const URL_PRODUCTO = import.meta.env.VITE_API_PRODUCTO;
/*
GET devuelven una lista de elementos o un elemento
POST me permiten crear un elemento
PUT / PATH me permite editar un elemento | PUT todo el elemento PATH solo una propiedad no necesariamente todo el objeto
DELETE  Eliminar un elemento
*/
export const iniciarSesion = async (usuario) => {
    try{
        const respuesta = await fetch(URL_USUARIO);
        const listaUsuarios = await respuesta.json();
        const usuarioBuscado = listaUsuarios.find((itemUsuario)=> itemUsuario.email === usuario.email)

        if(usuarioBuscado){
            // el mail es correcto
            if(usuarioBuscado.password === usuario.password){
                return usuarioBuscado;
            }else{
                console.log("password incorrecto");
                return null;
            }
        }else{
            console.log("El mail no existe");
            // el mail no existe
            return null;
        }
    }catch(error){
        console.log(error);
    }
}

export const obtenerListaProducto = async () => {
    try{
        const respuesta = await fetch(URL_PRODUCTO);

        const listaProductos = await respuesta.json();

        return listaProductos;
    }catch(error){
        console.log(error);
    }
}

export const crearProducto = async (producto) => {
    try {
        const respuesta = await fetch(URL_PRODUCTO, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(producto)
        });
        return respuesta; // retorna un producto creado
    } catch (error) {
        console.log(error);
    }
}

export const borrarProducto = async (id) => {
    try {
        const respuesta = await fetch(URL_PRODUCTO+"/"+id, {
            method:"DELETE"
        });
        return respuesta; // status 200 se pudo eliminar
    } catch (error) {
        console.log(error)
    }
}

export const editarProducto = async (producto, id) => {
    try {
        const respuesta = await fetch(URL_PRODUCTO+"/"+id,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(producto)
        });
        return respuesta // status 201 se pudo editar
    } catch (error) {
        console.log(error);
    }
}

export const obtenerProducto = async (id) => {
    try {
        const respuesta = await fetch(URL_PRODUCTO+"/"+id);
        const producto = respuesta.json();
        return producto;
    } catch (error) {
        console.log(error);
    }
}