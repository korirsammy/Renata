import React, {  useContext,useEffect  } from "react";
import { Grid } from "semantic-ui-react";
import ProductList  from "./ProductList";
import {observer} from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from "../../../app/stores/rootStore";


 const ProductsDashboard: React.FC = () => {

  const rootStore = useContext(RootStoreContext);
  const {loadProducts,loadingInitial}= rootStore.productStore;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  
  if (loadingInitial)
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