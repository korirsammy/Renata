import React, {useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IProduct } from "./../../../app/model/product";

import { v4 as uuid } from "uuid";
import ProductsStore from "../../../app/stores/productsStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const productsStore = useContext(ProductsStore);

  const {
    createProduct,
    editProduct,
    submitting,   
    product: initialFormState,
    loadProduct,
    clearProduct
  } = productsStore;

  const [product, setProduct] = useState<IProduct>({
    id: "",
    productId: "",
    imeiNumber: "",
    sellingPrice: "",
    venderPrice: "",
    venderId: "",
    colorId: "",
    description: "",
    image: "",
    createdOn: ""
  });

  useEffect(() => {
    if (match.params.id && product.id.length === 0) {
      loadProduct(match.params.id).then(
        () => initialFormState && setProduct(initialFormState)
      );
    }
    return () => {
      clearProduct();
    }
  }, [
    loadProduct,
    clearProduct,
    match.params.id,    
    initialFormState,
    product.id.length
  ]);

  const handleSubmit = () => {
    if (product.id.length === 0) {
      let newProduct = {
        ...product,
        id: uuid()
      };
      createProduct(newProduct).then(() =>
        history.push(`/products/${newProduct.id}`)
      );
    } else {
      editProduct(product).then(() => history.push(`/products/${product.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
      <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={product.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="imeiNumber"
          placeholder="imeiNumber"
          value={product.imeiNumber}
        />
        <Form.Input
          onChange={handleInputChange}
          name="sellingPrice"
          placeholder="sellingPrice"
          value={product.sellingPrice}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venderPrice"
          placeholder="venderPrice"
          value={product.venderPrice}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venderId"
          placeholder="venderId"
          value={product.venderId}
        />
        <Form.Input
          onChange={handleInputChange}
          name="colorId"
          placeholder="colorId"
          value={product.colorId}
        />
        <Form.Input
          onChange={handleInputChange}
          name="createdOn"
          type="datetime-local"
          placeholder="createdOn"
          value={product.createdOn}
        />

        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
         onClick={() => history.push('/products')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
      </Grid.Column>
    </Grid>
   
  );
};

export default observer(ProductForm);
