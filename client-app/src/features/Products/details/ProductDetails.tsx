import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ProductsStore from "../../../app/stores/productsStore";
import {observer} from 'mobx-react-lite';




 const ProductDetails: React.FC = () => {

  const productsStore = useContext(ProductsStore);
  const{selectedProduct:product,openEditForm,cancelSelectedProduct}=productsStore;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${product!.id}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{product!.description}</Card.Header>
        <Card.Meta>
          <span>{product!.createdOn}</span>
        </Card.Meta>
        <Card.Description>{product!.imeiNumber}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(product!.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedProduct}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default observer(ProductDetails);