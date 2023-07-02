import { Form, Button } from "react-bootstrap";
import {
    editarProducto,
    obtenerProducto,
} from "../../helpers/queries";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const EditarProducto = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    const { id } = useParams();

    useEffect(() => {
        obtenerProducto(id).then((respuesta) => {
            console.log(respuesta);
            // cargar el formulario con los datos del mismo objeto
            if (respuesta) {
                setValue("nombreProducto", respuesta.nombreProducto);
                setValue("precio", respuesta.precio);
                setValue("imagen", respuesta.imagen);
                setValue("descripcion", respuesta.descripcion);
            }
        });
    }, []);

    const onSubmit = (producto) => {
        // agregar la consulta de la api que pide editar es similar a crear producto
        editarProducto(producto, id).then((respuesta) => {
            console.log(respuesta.status);
            if (respuesta.status === 200) {
                Swal.fire(
                    "Producto editada",
                    `El producto ${producto.nombreProducto} fue editada con éxito`,
                    "success"
                );
                reset();
            } else {
                Swal.fire(
                    "Error al intentar editar",
                    "Intentelo de nuevo",
                    "error"
                );
            }
        });
    };

    return (
        <section className="container mainSection">
            <h1 className="display-4 mt-5">Editar producto</h1>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formNombreProdcuto">
                    <Form.Label>Producto*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ej: Cafe"
                        {...register("nombreProducto", {
                            required: "El nombre del producto es obligatorio",
                            minLength: {
                                value: 2,
                                message:
                                    "El nombre del producto debe tener 2 caracteres minimo",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "El nombre del producto debe tener 20 caracteres máximo",
                            },
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.nombreProducto?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrecio">
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ej: 50"
                        {...register("precio", {
                            requires: "El precio del producto es requerido",
                            minLength: {
                                value: 1,
                                message: "El precio no puede ser inferior a 1",
                            },
                            maxLength: {
                                value: 50000,
                                message:
                                    "El precio del producto no puede ser mayor a 50.000",
                            },
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.precio?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImagen">
                    <Form.Label>Imagen URL*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
                        {...register("imagen", {
                            required: "La URL de la imagen es obligatoria",
                            pattern: {
                                value: /^https:\/\/[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}(\/[^\s]*)?$/,
                                message: "URL invalida",
                            },
                        })}
                    />
                    <Form.Text>{errors.imagen?.message}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrecio">
                    <Form.Label>Categoria*</Form.Label>
                    <Form.Select
                        {...register("categoria", {
                            required: "La categoria es requerida",
                        })}
                    >
                        <option value="">Seleccione una opcion</option>
                        <option value="bebida caliente">Bebida caliente</option>
                        <option value="bebida fria">Bebida fria</option>
                        <option value="dulce">Dulce</option>
                        <option value="salado">Salado</option>
                    </Form.Select>
                    <Form.Text className="text-danger">
                        {errors.categoria?.message}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
            </Form>
        </section>
    );
};

export default EditarProducto;
