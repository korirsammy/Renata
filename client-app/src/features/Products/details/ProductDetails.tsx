import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import  LoadingComponent  from "../../../app/layout/LoadingComponent";
import { Link } from 'react-router-dom';
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  
  const rootStore = useContext(RootStoreContext);
  const productsStore= rootStore.productStore;
 
  const {
    product,   
    loadProduct,
    loadingInitial
  } = productsStore;

  useEffect(() => {
    loadProduct(match.params.id);
  }, [loadProduct,match.params.id,history]);

  if (loadingInitial || !product)
    return <LoadingComponent content="loading product..." />;

    if (!product) return <h2>Product not found</h2>;

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

        </Card.Meta>
        <Card.Description>{product!.imeiNumber}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
           as={Link} to={`/manage/${product.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={()=>history.push('/products')}
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
