import React, {
  useState,
  useEffect,
  Fragment,
  SyntheticEvent
} from "react";
import { Container } from "semantic-ui-react";
import { IProduct } from "./../model/product";
import { NavBar } from "./../../features/nav/NavBar";
import { ProductsDashboard } from "../../features/Products/dashboard/ProductsDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleCreateProduct = (product: IProduct) => {
    setSubmitting(true);
    agent.Products.create(product)
      .then(() => {
        setProducts([...products, product]);
        setSelectedProduct(product);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleEditProduct = (product: IProduct) => {
    setSubmitting(true);
    agent.Products.update(product)
      .then(() => {
        setProducts([...products.filter(a => a.id !== product.id), product]);
        setSelectedProduct(product);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteProduct = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Products.delete(id)
      .then(() => {
        setProducts([...products.filter(a => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProduct(products.filter(p => p.id ===  id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedProduct(null);
    setEditMode(true);
  };

  useEffect(() => {
    agent.Products.list()
      .then(response => {
        let products: IProduct[] = [];
        response.forEach(product => {
          product.createdOn = product.createdOn.split(".")[0];
          products.push(product);
        });
        setProducts(products);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading products" />;

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
                submitting={submitting}
                target={target}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default App;
