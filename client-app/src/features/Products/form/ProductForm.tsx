import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { ProductFormValues } from "./../../../app/model/product";
import ProductsStore from "../../../app/stores/productsStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "./../../../app/common/form/TextInput";
import TextAreaInput from "./../../../app/common/form/TextAreaInput";
import SelectInput from "./../../../app/common/form/SelectInput";
import { vendors } from "./../../../app/common/options/vendorOptions";
import DateInput from "./../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import { v4 as uuid } from "uuid";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';

const validate = combineValidators({
   description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  imeiNumber: isRequired({ message: 'IMEI Number is required' }),
  venderId: isRequired('Vender')
 
});

interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const productsStore = useContext(ProductsStore);

  const { createProduct, editProduct, submitting, loadProduct } = productsStore;

  const [product, setProduct] = useState(new ProductFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadProduct(match.params.id)
        .then(product => {
          setProduct(new ProductFormValues(product));
        })
        .finally(() => setLoading(false));
    }
  }, [loadProduct, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.createdOn, values.time);
    const { date, time, ...product } = values;
    product.createdOn = dateAndTime;
    if (!product.id) {
      let newProduct = {
        ...product,
        id: uuid()
      };
      createProduct(newProduct);
    } else {
      editProduct(product);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
           validate={validate}
            initialValues={product}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit,invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="description"
                  placeholder="Description"
                  value={product.description}
                  rows={2}
                  component={TextAreaInput}
                />
                <Field
                  name="imeiNumber"
                  placeholder="imeiNumber"
                  value={product.imeiNumber}
                  component={TextInput}
                />
                <Field
                  name="sellingPrice"
                  placeholder="sellingPrice"
                  value={product.sellingPrice}
                  component={TextInput}
                />
                <Field
                  name="venderPrice"
                  placeholder="venderPrice"
                  value={product.venderPrice}
                  component={TextInput}
                />
                <Field
                  component={SelectInput}
                  options={vendors}
                  name="venderId"
                  placeholder="venderId"
                  value={product.venderId}
                />

                <Field
                  name="colorId"
                  placeholder="colorId"
                  value={product.colorId}
                  component={TextInput}
                />
                <Form.Group widths="equal">
                  <Field
                    name="createdOn"
                    date={true}
                    placeholder="Date"
                    value={product.createdOn}
                    component={DateInput}
                  />
                  <Field
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={product.time}
                    component={DateInput}
                  />
                </Form.Group>

                <Button
                
                  disabled={loading || invalid || pristine}
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  disabled={loading}
                  onClick={
                    product.id
                      ? () => history.push(`/products/${product.id}`)
                      : () => history.push("/products")
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductForm);
