import React from "react";
import { Item, Button,  Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IProduct } from "../../../app/model/product";
import {format} from 'date-fns';

export const ProductListItem: React.FC<{ product: IProduct }> = ({
  product
}) => {
 

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as='a'>{product.description}</Item.Header>
              <Item.Description>{product.sellingPrice}</Item.Description>
              <Item.Description>{product.venderPrice}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='marker' /> {product.venderId}
        <Icon name='clock' /> {format(product.createdOn,'eeee do MMMM')}
        <Icon name='marker' /> {product.imeiNumber}, {product.venderId}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{product.description}</span>
        <Button
          as={Link}
          to={`/products/${product.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};
