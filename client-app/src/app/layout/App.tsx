import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  Component
} from "react";
import { Header, Icon, List, Container } from "semantic-ui-react";
import axios from "axios";
import { IProduct } from "./../model/product";
import { NavBar } from "./../../features/nav/NavBar";
import { ProductsDashboard } from "../../features/Products/dashboard/ProductsDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [editMode, setEditMode]=useState(false);
  const [loading, setLoading] = useState(true);

  const handleSelectProduct = (id: string) => {
    setSelectedProduct(products.filter(p => p.id == id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedProduct(null);
    setEditMode(true);
  };

  const handleCreateProduct = (product: IProduct) => {
    setProducts([...products, product]);
    setSelectedProduct(product);
    setEditMode(false);
  }

  const handleEditProduct = (product: IProduct) => {
    setProducts([...products.filter(a => a.id !== product.id), product])
    setSelectedProduct(product);
    setEditMode(false);
  }
  const handleDeleteProduct = (id: string) => {
    setProducts([...products.filter(a => a.id !== id)])
  }

  useEffect(() => {
    agent.Products.list()
      .then(response => {
        let products: IProduct[] = [];
        response.forEach(product => {    
          product.createdOn = product.createdOn.split('.')[0]    
          products.push(product);
        });
        setProducts(products);
      })
      .then(() => setLoading(false));
  }, []);

  return (
    <Fragment>
      <ToastContainer position="bottom-right" />

      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar openCreateForm={handleOpenCreateForm} />
            <Container style={{ marginTop: "7em" }}>
              <ProductsDashboard
                products={products}
                selectProduct={handleSelectProduct}
                selectedProduct={selectedProduct!}
                editMode={editMode}
                setEditMode={setEditMode}
                setSelectedProduct={setSelectedProduct}
                createProduct={handleCreateProduct}
                editProduct={handleEditProduct}
                deleteProduct={handleDeleteProduct}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default App;
