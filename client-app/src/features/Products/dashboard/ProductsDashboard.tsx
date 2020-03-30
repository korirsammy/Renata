import React, {  useContext } from "react";
import { Grid } from "semantic-ui-react";
import ProductList  from "./ProductList";
import  ProductDetails  from "../details/ProductDetails";
import  ProductForm  from "../form/ProductForm";
import {observer} from 'mobx-react-lite';
import ProductsStore from "../../../app/stores/productsStore";


 const ProductsDashboard: React.FC = () => {

  const productsStore = useContext(ProductsStore);
  const{editMode,selectedProduct}=productsStore;

  
  return (
    <Grid>
      <Grid.Column width={10}>
        <ProductList  />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedProduct && !editMode && (
          <ProductDetails />
        )}
        {editMode && (
          <ProductForm           
            key={(selectedProduct && selectedProduct.id) || 0}          
            product={selectedProduct!}  
          />
        )}
      </Grid.Column>
    </Grid>
  );
};


export default observer(ProductsDashboard);