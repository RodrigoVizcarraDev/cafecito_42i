import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { borrarProducto } from "../../helpers/queries";
import Swal from "sweetalert2";
const ItemProducto = ({producto, productos, setProductos}) => {
    const navegacion = useNavigate();
    const toEditarProducto = () => {
        navegacion("/administrador/editar-producto/"+producto.id);
    };

    const handleClickBorrar = () => {
        borrarProducto(producto.id).then((respuesta)=>{
            if(respuesta.status === 200){
                eliminarProducto();
                Swal.fire(
                    "Producto borrado",
                    `El producto ${producto.nombreProducto} fue borrado`,
                    "success"
                );
            }else{
                Swal.fire(
                    "No se pudo borrar el producto",
                    "Error al intentar borrar intentelo más tarde",
                    "error"
                );
            }
        })
    }
    const eliminarProducto = () => {
        const listaLuegoDeBorrar = productos.filter((productosFiltrador) => productosFiltrador !== producto);
        setProductos(listaLuegoDeBorrar);
    }
    return (
        <tr>
            {/* <td>{props.producto.id}</td> */}
            <td>{producto.id}</td>
            <td>{producto.nombreProducto}</td>
            <td>{producto.precio}</td>
            <td>{producto.imagen}</td>
            <td>{producto.categoria}</td>
            <td>
                <Button className="btn btn-warning" onClick={toEditarProducto}>
                    Editar
                </Button>
                <Button variant="danger" onClick={handleClickBorrar}>Borrar</Button>
            </td>
        </tr>
    );
};

export default ItemProducto;
