import { observable, action, computed, runInAction, configure } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IProduct } from "../model/product";
import agent from "../api/agent";

configure({enforceActions: 'always'});

class ProductsStore {
   @observable productsRegistry = new Map();
  @observable product: IProduct | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get productsByDate() {
    return this.groupProductsByDate(Array.from(this.productsRegistry.values()))
  }

  groupProductsByDate(product: IProduct[]) {
    const sortedProducts = product.sort(
      (a, b) => Date.parse(a.createdOn) - Date.parse(b.createdOn)
    )
    return Object.entries(sortedProducts.reduce((products, product) => {
      const createdOn = product.createdOn.split('T')[0];
      products[createdOn] = products[createdOn] ? [...products[createdOn], product] : [product];
      return products;
    }, {} as {[key: string]: IProduct[]}));
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
    //  console.log(this.groupProductsByDate(products));
    } catch (error) {
      runInAction('load products error', () => {
        this.loadingInitial = false;
      })
    }
  };
  @action loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product) {
      this.product = product;
    } else {
      this.loadingInitial = true;
      try {
        product = await agent.Products.details(id);
        runInAction('getting products',() => {
          this.product = product;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get product error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }
  @action clearProduct = () => {
    this.product = null;
  }
  getProduct = (id: string) => {
    return this.productsRegistry.get(id);
  }



  @action createProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.create(product);
      runInAction('create activity', () => {
        console.log(product);
        console.log(product.id);
        this.productsRegistry.set(product.id, product);
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
        this.product = product;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('edit activity error', () => {
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
      runInAction('deleting activity', () => {
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
}
export default createContext(new ProductsStore());
