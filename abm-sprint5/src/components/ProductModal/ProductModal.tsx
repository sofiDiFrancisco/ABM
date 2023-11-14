import { ProductService } from "../../services/ProductService";
import { ModalType } from "../../types/ModalType";
import { Producto } from "../../types/Product";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import {toast} from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";

type ProductModalProps ={
    show: boolean;
    onHide: ()=> void;
    title: string;
    modalType: ModalType;
    prod: Producto;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductModal = ({show, onHide, title, modalType, prod, refreshData}:ProductModalProps ) => {

  const handleSaveUpdate= async (pro:Producto) => {
    try {
      const isNew = pro.id===0;
      if (isNew) {
        await ProductService.createProduct(pro);
      } else{
        await ProductService.updateProduct(pro.id, pro);
      }
      toast.success(isNew ? "Producto creado": "Producto actualizado",{
        position: "top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error")
    }
  };

  const handleDelete=async () => {
    try {
      await ProductService.deleteProduct(prod.id);
      toast.success("Producto borrado",{
        position:"top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error")
    }
  }

  const validationSchema= () => {
    return Yup.object().shape({
      id: Yup.number().integer().min(0),
      denominacion: Yup.string().required("El nombre es requerido"),
      tiempoEstimadoCocina: Yup.number().min(0).required("El tiempo estimado de cocción es requerido"),
      precioVenta: Yup.number().min(0).required("El precio es requerido"),
      costo: Yup.number().min(0).required("El costo es requerido"),
      urlImagen: Yup.string().required("La URL de la imagen es requerida"),
    });
  };

  const formik = useFormik({
    initialValues: prod,
    validationSchema: validationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: Producto) => handleSaveUpdate(obj),
  });

  return (
    <>
    {modalType === ModalType.DELETE ? (
      <>
      <Modal show={show} onHide={onHide} centered backdrop="static">

        <Modal.Header closeButton>
          <Modal.Title> {title} </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>¿Está seguro que desea eliminar el producto <br/>
          <strong> {prod.denominacion} </strong>?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}> Cancelar </Button>
          <Button variant="danger" onClick={handleDelete}> Borrar </Button>
        </Modal.Footer>

      </Modal>
      </>
    ):(
      <>
        <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
          <Modal.Header>
            <Modal.Title> { title }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>

            {/* denomination */}
              <Form.Group controlId='formDenominacion'>
                <FormLabel> Denominacion </FormLabel>
                <Form.Control 
                name="denominacion"
                type="text"
                value={formik.values.denominacion || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.denominacion}
                </Form.Control.Feedback>
              </Form.Group>

              {/* time */}
              <Form.Group controlId='formTiempoEstimadoCocina'>
                <FormLabel> Tiempo Estimado de Cocina</FormLabel>
                <Form.Control 
                name="tiempoEstimadoCocina"
                type="number"
                value={formik.values.tiempoEstimadoCocina || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.tiempoEstimadoCocina && formik.touched.tiempoEstimadoCocina)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.tiempoEstimadoCocina}
                </Form.Control.Feedback>
              </Form.Group>
            
            {/* price */}
              <Form.Group controlId='formPrecioVenta'>
                <FormLabel> Precio Venta</FormLabel>
                <Form.Control 
                name="precioVenta"
                type="number"
                value={formik.values.precioVenta || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.precioVenta && formik.touched.precioVenta)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.precioVenta}
                </Form.Control.Feedback>
              </Form.Group>

             {/* cost */}
             <Form.Group controlId='formCosto'>
                <FormLabel> Costo</FormLabel>
                <Form.Control 
                name="costo"
                type="number"
                value={formik.values.costo || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.costo && formik.touched.costo)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.costo}
                </Form.Control.Feedback>
              </Form.Group>
            
            {/* imagen */}
              <Form.Group controlId='formUrlImagen'>
                <FormLabel> Imagen </FormLabel>
                <Form.Control 
                name="urlImagen"
                type="text"
                value={formik.values.urlImagen || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.urlImagen && formik.touched.urlImagen)}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.urlImagen}
                </Form.Control.Feedback>
              </Form.Group>

              <Modal.Footer className="mt-4">
                <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                <Button variant="primary" type="submit" disabled={!formik.isValid}> Guardar </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )}
    </>
  )
}

export default ProductModal