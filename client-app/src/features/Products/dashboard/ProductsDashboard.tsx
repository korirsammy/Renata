import React, {  useContext,useEffect  } from "react";
import { Grid } from "semantic-ui-react";
import ProductList  from "./ProductList";
import {observer} from 'mobx-react-lite';
import ProductsStore from "../../../app/stores/productsStore";
import LoadingComponent from '../../../app/layout/LoadingComponent';


 const ProductsDashboard: React.FC = () => {

  const productsStore = useContext(ProductsStore);
  useEffect(() => {
    productsStore.loadProducts();
  }, [productsStore]);

  
  if (productsStore.loadingInitial)
    return <LoadingComponent content='Loading products' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ProductList  />
      </Grid.Column>
      <Grid.Column width={6}>
       <h2>Product filters</h2>
      </Grid.Column>
    </Grid>
  );
};


export default observer(ProductsDashboard);