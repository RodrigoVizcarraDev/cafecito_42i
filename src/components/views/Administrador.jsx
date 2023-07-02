import { Table, Button } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerListaProducto } from "../helpers/queries";
import Swal from "sweetalert2";

const Administrador = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // consultar a la api y guardar la respuesta en el state

        obtenerListaProducto().then((respuesta) => {
            if (respuesta) {
                setProductos(respuesta);
            } else {
                Swal.fire(
                    "Error",
                    "Intente realizar esta operacion en unos minutos",
                    "error"
                );
            }
        });
    }, []);

    const navegacion = useNavigate();
    const toCrearProducto = () => {
        navegacion("/administrador/crear-producto");
    };
    return (
        <section className="container mainSection">
            <div className="d-flex justify-content-between align-items-center mt-5">
                <h1 className="display-4 ">Productos disponibles</h1>
                <Button
                    className="btn btn-primary"
                    to="/administrar/crear"
                    onClick={toCrearProducto}
                >
                    Agregar
                </Button>
            </div>
            <hr />
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>URL de Imagen</th>
                        <th>Categoria</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => {
                        return (
                            <ItemProducto
                                key={producto.id}
                                producto={producto}
                                setProductos={setProductos}
                                productos={productos}
                            ></ItemProducto>
                        );
                    })}
                </tbody>
            </Table>
        </section>
    );
};

export default Administrador;
