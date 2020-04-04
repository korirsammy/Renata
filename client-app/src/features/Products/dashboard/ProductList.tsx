import React, { useContext, Fragment } from "react";
import { Item,  Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ProductListItem } from "./ProductListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import {format} from 'date-fns';


const ProductList: React.FC = () => {

  const rootStore = useContext(RootStoreContext);  
  const { productsByDate } = rootStore.productStore;

  return (
    <Fragment>
      {productsByDate.map(([group, products]) => (
        <Fragment key={group}>
          <Label size='large' color='blue'>
          
            {format(group, 'eeee do MMMM')}
          </Label>
          <Item.Group divided>
            {products.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ProductList);
