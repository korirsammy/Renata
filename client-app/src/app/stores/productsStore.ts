import { observable, action, computed, runInAction, configure } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IProduct } from "../model/product";
import agent from "../api/agent";

configure({enforceActions: 'always'});

class ProductsStore {
  @observable productsRegistry = new Map();
  @observable products: IProduct[] = [];
  @observable selectedProduct: IProduct | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';



  @computed get productsByDate() {
    return Array.from(this.productsRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadProducts = async () => {
    this.loadingInitial = true;
    try {
      const products = await agent.Products.list();
      runInAction('loading products', () => {
        products.forEach(product => {
          product.createdOn = product.createdOn.split('.')[0];
          this.productsRegistry.set(product.id, product);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load products error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action createProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.create(product);
      runInAction('create product', () => {
        this.productsRegistry.set(product.id, product);
        this.editMode = false;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create product error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  

  @action editProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.update(product);
      runInAction('editing product', () => {
        this.productsRegistry.set(product.id, product);
        this.selectedProduct = product;
        this.editMode = false;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit product error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };
  @action deleteProduct = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Products.delete(id);
      runInAction('deleting product', () => {
        this.productsRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete product error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedProduct = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedProduct = this.productsRegistry.get(id);
    this.editMode = true;
  }
  @action cancelSelectedProduct = () => {
    this.selectedProduct = undefined;
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  }
  @action selectProduct = (id: string) => {    
      this.selectedProduct = this.productsRegistry.get(id);
    this.editMode = false;
  };
}
export default createContext(new ProductsStore());
