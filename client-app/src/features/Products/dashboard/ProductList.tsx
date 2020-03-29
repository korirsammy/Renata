import React, { SyntheticEvent } from "react";
import {
  Item,
  Button,
  Label,
  Segment,
  Grid} from "semantic-ui-react";
import { IProduct } from "../../../app/model/product";

interface IProps {
  products: IProduct[];
  selectProduct: (id: string) => void;
  deleteProduct: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const ProductList: React.FC<IProps> = ({
  products,
  selectProduct,
  deleteProduct,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column widht={10}>
        <Segment clearing>
          <Item.Group divided>
            {products.map(product => (
              <Item key={product.id}>
                <Item.Content>
                  <Item.Header as="a">{product.description}</Item.Header>
                  <Item.Meta>{product.colorId}</Item.Meta>
                  <Item.Description>
                    <div>{product.venderPrice}</div>
                    <div>{product.sellingPrice}</div>
                  </Item.Description>
                  <Item.Extra>
                    <Button
                      onClick={() => selectProduct(product.id)}
                      floated="right"
                      content="View"
                      color="blue"
                    />
                    <Button
                      name={product.id}
                      loading={target === product.id && submitting}
                      onClick={(e) => deleteProduct(e, product.id)}
                      floated="right"
                      content="Delete"
                      color="red"
                    />

                    <Label basic content={product.description} />
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
