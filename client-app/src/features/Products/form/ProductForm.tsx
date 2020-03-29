import React, { FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IProduct } from "./../../../app/model/product";
import { useState } from "react";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  product: IProduct;
  createProduct: (activity: IProduct) => void;
  editProduct: (activity: IProduct) => void;
  submitting: boolean;
}
export const ProductForm: React.FC<IProps> = ({
  setEditMode,
  product: initialFormState,
  editProduct,
  createProduct,
  submitting
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
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
      };
    }
  };
  const [product, setProduct] = useState<IProduct>(initializeForm);

  const handleSubmit = () => {
    if (product.id.length === 0) {
      let newProduct = {
        ...product,
        id: uuid()
      };
      createProduct(newProduct);
    } else {
      editProduct(product);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProduct({ ...product, [name]: value });
  };

  return (
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
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
