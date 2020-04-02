import React, { useContext, Fragment } from "react";
import { Item,  Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProductsStore from "../../../app/stores/productsStore";
import { ProductListItem } from "./ProductListItem";


const ProductList: React.FC = () => {

  const productsStore = useContext(ProductsStore);
  const { productsByDate } = productsStore;

  return (
    <Fragment>
      {productsByDate.map(([group, products]) => (
        <Fragment key={group}>
          <Label size='large' color='blue'>
            {group}
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
