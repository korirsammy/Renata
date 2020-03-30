import React, {  useContext } from "react";
import {
  Item,
  Button,
  Label,
  Segment,
  Grid} from "semantic-ui-react";
import {observer} from 'mobx-react-lite';
import ProductsStore from "../../../app/stores/productsStore";

 const ProductList: React.FC = () => {

  const productsStore = useContext(ProductsStore);
  const{productsByDate,selectProduct,deleteProduct,submitting,target}=productsStore;

  return (
    <Grid>
      <Grid.Column widht={10}>
        <Segment clearing>
          <Item.Group divided>
            {productsByDate.map(product => (
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

export default observer(ProductList);