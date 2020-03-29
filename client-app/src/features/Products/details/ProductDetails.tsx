import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { IProduct } from "../../../app/model/product";

interface IProps {
  product: IProduct;
  setEditMode: (editMode: boolean) => void;
  setSelectedProduct: (product: IProduct | null) => void;
}

export const ProductDetails: React.FC<IProps> = ({
  product,
  setEditMode,
  setSelectedProduct
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${product.id}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{product.description}</Card.Header>
        <Card.Meta>
          <span>{product.createdOn}</span>
        </Card.Meta>
        <Card.Description>{product.imeiNumber}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => setSelectedProduct(null)}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
