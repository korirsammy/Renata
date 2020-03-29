import React from "react";
import { Grid } from "semantic-ui-react";
import { List } from "semantic-ui-react";
import { IProduct } from "../../../app/model/product";
import { ProductList } from "./ProductList";
import { ProductDetails } from "../details/ProductDetails";
import { ProductForm } from "../form/ProductForm";

interface IProps {
  products: IProduct[];
  selectProduct: (id: string) => void;
  selectedProduct: IProduct;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedProduct: (product: IProduct | null) => void;
  createProduct: (activity: IProduct) => void;
  editProduct: (activity: IProduct) => void;
  deleteProduct: (id: string) => void;
}

export const ProductsDashboard: React.FC<IProps> = ({
  products,
  selectProduct,
  selectedProduct,
  editMode,
  setEditMode,
  setSelectedProduct,
  createProduct,
  editProduct,
  deleteProduct
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ProductList
          products={products}
          selectProduct={selectProduct}
          deleteProduct={deleteProduct}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedProduct && !editMode && (
          <ProductDetails
            product={selectedProduct}
            setEditMode={setEditMode}
            setSelectedProduct={setSelectedProduct}
          />
        )}
        {editMode && (
          <ProductForm
            key={selectedProduct && selectedProduct.id || 0}
            setEditMode={setEditMode}
            product={selectedProduct!}
            createProduct={createProduct}
            editProduct={editProduct}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
