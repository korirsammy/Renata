import {observable, action} from 'mobx';
import { createContext } from 'react';
import { IProduct } from '../model/product';
import agent from '../api/agent';

class ProductsStore{
   
     @observable productsRegistry = new Map();
    @observable products: IProduct[] = [];
    @observable selectedProduct: IProduct | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';


    @action loadProducts=()=>{
        this.loadingInitial=true;

        agent.Products.list()
        .then(products=>{
           products.forEach((product)=>{
               this.products.push(product);
           })
        }).finally(()=>this.loadingInitial=false)
    }





    @action selectActivity = (id: string) => {
        this.selectedProduct = this.productsRegistry.get(id);
        this.editMode = false;
      };

}
export default createContext(new ProductsStore());

