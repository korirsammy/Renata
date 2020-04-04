import { observable, action, computed, runInAction } from "mobx";
import {  SyntheticEvent } from "react";
import { IProduct } from "../models/product";
import agent from "../api/agent";
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from "./rootStore";




export default class ProductsStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  
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
     
      (a, b) => a.createdOn.getTime() - b.createdOn.getTime()
    )
    return Object.entries(sortedProducts.reduce((products, product) => {
      const createdOn = product.createdOn.toISOString().split('T')[0];
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
          product.createdOn = new Date(product.createdOn);
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
 
  @action loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product) {
      this.product = product;
      return product;
    } else {
      this.loadingInitial = true;
      try {
        product = await agent.Products.details(id);
        runInAction('getting product',() => {          
          product.createdOn = new Date(product.createdOn);
          this.product = product;
          this.productsRegistry.set(product.id, product);
          this.loadingInitial = false;
        })
       
        return product;
       
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
      runInAction('create product', () => {
        this.productsRegistry.set(product.id, product);
        this.submitting = false;
      })
      history.push(`/products/${product.id}`)
    } catch (error) {
      runInAction('create product error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
      console.log(error.response);
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
      history.push(`/products/${product.id}`)
    } catch (error) {
      runInAction('edit product error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
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

