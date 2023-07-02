import { Button, Form, FormText } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Registro = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (usuarioRegistrado) => {
        console.log(usuarioRegistrado);
    };

    return (
        <div className="mt-5 mainSection">
            <h3 className="text-center">Registro</h3>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-2">
                            <Form.Control
                                type="text"
                                placeholder="Ingrese un nombre de usuario"
                                {...register("userName", {
                                    required:
                                        "El nombre de usuario es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-Z0-9_-]{3,16}$/,
                                        message:
                                            "El nombre de usuario debe tener entre 3 y 16 caracteres",
                                    },
                                })}
                            />
                            <FormText className="text-danger">
                                {errors.userName?.message}
                            </FormText>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control
                                placeholder="Ingrese un email"
                                {...register("email", {
                                    required: "El email es obligatorio",
                                    pattern: {
                                        value: /^(?!\.)(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message:
                                            "El email debe tener el siguiente formato mail@dominio.com",
                                    },
                                })}
                            />
                            <FormText className="text-danger">
                                {errors.email?.message}
                            </FormText>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control
                                type="password"
                                placeholder="Ingrese un password"
                                {...register("password", {
                                    required: "El password es obligatorio",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/,
                                        message:
                                            "El password debe tener entre 8 y 16 caracteres, al menos un digito, almenos una minuscula y al menos una mayuscula",
                                    },
                                })}
                            />
                            <FormText className="text-danger">
                                {errors.password?.message}
                            </FormText>
                        </Form.Group>
                        <div className="row">
                            <Button
                                className="btn btn-dark btn-lg btn-block mb-2"
                                type="submit"
                            >
                                Registrar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Registro;
