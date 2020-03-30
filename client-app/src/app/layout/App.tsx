import React, { 
  useEffect,
  Fragment, 
  useContext
} from "react";
import { Container } from "semantic-ui-react";
import  NavBar  from "./../../features/nav/NavBar";
import  ProductsDashboard  from "../../features/Products/dashboard/ProductsDashboard";
import { LoadingComponent } from "./LoadingComponent";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";
import ProductsStore from "../stores/productsStore";
import {observer} from 'mobx-react-lite';

const App = () => {
  const productsStore = useContext(ProductsStore);

  useEffect(() => {
    productsStore.loadProducts();
  }, [productsStore]);

  if (productsStore.loadingInitial) return <LoadingComponent content="Loading products" />;

  return (
    <Fragment>
      <ToastContainer position="bottom-right" />

      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar  />
            <Container style={{ marginTop: "7em" }}>
              <ProductsDashboard />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default observer(App);
