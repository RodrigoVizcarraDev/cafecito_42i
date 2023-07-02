import { Form, Button, FormText } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearProducto } from "../../helpers/queries";
import Swal from "sweetalert2";
const CrearProducto = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (productoNuevo) => {
        console.log(productoNuevo);
        crearProducto(productoNuevo).then((respuesta) => {
            console.log(respuesta.status);
            if (respuesta.status === 201) {
                Swal.fire(
                    "Producto creado",
                    `El producto ${productoNuevo.nombreProducto} se creó con éxito`,
                    "success"
                );
                reset();
            } else {
                Swal.fire(
                    "Falló la creación del producto",
                    `El producto ${productoNuevo.nombreProducto} no pudo ser creado`,
                    "error"
                );
            }
        });
    };
    return (
        <section className="container mainSection">
            <h1 className="display-4 mt-5">Nuevo producto</h1>
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
                                    "El nombre de producto debe tener como minimo 2 caracteres",
                            },
                            maxLength: {
                                value: 50,
                                message:
                                    "El nombre de producto debe tener como maximo 50 caracteres",
                            },
                        })}
                    />
                    <FormText className="text-danger">
                        {errors.nombreProducto?.message}
                    </FormText>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrecio">
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ej: 50"
                        {...register("precio", {
                            required: "El precio del producto es obligatorio",
                            max: {
                                value: 50000,
                                message: "El maximo es hasta 50000",
                            },
                            min: {
                              value: 1,
                              message: "El precio minimo es de 1"
                            }
                        })}
                    />
                    <FormText className="text-danger">
                        {errors.precio?.message}
                    </FormText>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImagen">
                    <Form.Label>Imagen URL*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
                        {...register("imagen", {
                            required: "La URL del producto es obligatoria",
                            pattern: {
                                value: /^https:\/\/[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}(\/[^\s]*)?$/,
                                message: "URL invalia",
                            },
                        })}
                    />
                    <FormText className="text-danger">
                        {errors.urlProducto?.message}
                    </FormText>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrecio">
                    <Form.Label>Categoria*</Form.Label>
                    <Form.Select
                        {...register("categoria", {
                            required: "Selecciona una categoria",
                        })}
                    >
                        <option value="">Seleccione una opcion</option>
                        <option value="bebida caliente">Bebida caliente</option>
                        <option value="bebida fria">Bebida fria</option>
                        <option value="dulce">Dulce</option>
                        <option value="salado">Salado</option>
                    </Form.Select>
                    <FormText className="text-danger">
                        {errors.categoria?.message}
                    </FormText>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
            </Form>
        </section>
    );
};

export default CrearProducto;
