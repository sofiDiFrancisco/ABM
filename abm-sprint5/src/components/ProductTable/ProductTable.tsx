import { useEffect, useState } from "react"
import { Producto } from "../../types/Product"
import { ProductService } from "../../services/ProductService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
import ProductModal from "../ProductModal/ProductModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";


const ProductTable = () => {
    
    const[products, setProducts]= useState<Producto[]>([]);

    const[isLoading, setIsLoading]=useState(true);
    
    const[refreshData, setRefreshData]=useState(false);

    useEffect(()=> {
        const fetchProducts=async () => {
            const products = await ProductService.getProducts();
            setProducts(products);
            setIsLoading(false);
        };

        fetchProducts();
    }, [refreshData]);
    console.log(JSON.stringify(products, null, 2));
    
    const initializableNewProduct = (): Producto =>{
      return{
        id: 0,
        denominacion: "",
        tiempoEstimadoCocina: 0,
        precioVenta: 0,
        costo: 0,
        urlImagen: "",
      };
    };
    
    const  [product, setProduct]= useState<Producto>(initializableNewProduct);
    
    const[showModal, setShowModal]= useState(false);
    const[modalType, setModalType]= useState<ModalType>(ModalType.NONE);
    const[title, setTitle]= useState("");

    
    const handleClick= (newTitle: string, prod: Producto, modal:ModalType)=> {
      setTitle(newTitle);
      setModalType(modal);
      setProduct(prod);
      setShowModal(true);
    };

  return (
    <>
    <Button onClick={()=> handleClick("Nuevo producto", initializableNewProduct(),
    ModalType.CREATE)}> Nuevo Producto </Button>
      {isLoading ? <Loader/>: (
        <Table hover>
          <thead>
            <tr>
              <th>Denominacion</th>
              <th>TiempoEstimadoCocina</th>
              <th>PrecioVenta</th>
              <th>Costo</th>
              <th>Imagen</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {products.map(producto =>(
              <tr key={producto.id}>
                <td>{producto.denominacion}</td>
                <td>{producto.tiempoEstimadoCocina}</td>
                <td>{producto.precioVenta}</td>
                <td>{producto.costo}</td>
                <td><img src={producto.urlImagen} alt={producto.denominacion} 
                style={{width: '50px'}} /></td>
                <td><EditButton onClick={() => handleClick("Editar Producto", producto, ModalType.UPDATE)}/></td>
                <td><DeleteButton onClick={() => handleClick("Borrar Producto", producto, ModalType.DELETE)}/></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && (
        <ProductModal
        show={showModal} 
        onHide={()=> setShowModal(false)}
        title={title}
        modalType={modalType}
        prod={product}
        refreshData={setRefreshData}
        />
      )}

    </>
  )
}

export default ProductTable