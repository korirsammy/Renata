export interface IProduct{
    id: string;
    productId:string;
    imeiNumber:string;
    sellingPrice:string; 
    venderPrice:string; 
    venderId:string; 
    colorId:string; 
    description:string; 
    image:string;    
    createdOn:Date ; 
   
}

export interface IProductFormValues extends Partial<IProduct> {
    time?: Date;
}

export class ProductFormValues implements IProductFormValues {
   

    id?: string = undefined;
    productId: string = '';
    imeiNumber: string = '';
    sellingPrice: string = '';
    venderPrice: string = '';
    venderId: string = '';
    colorId: string = '';
    description: string = '';
    image: string = '';
    createdOn?:  Date = undefined;
    time?: Date = undefined;
    

    constructor(init?: IProductFormValues) {
        if (init && init.createdOn) {
            init.time = init.createdOn;
           
        }  
        Object.assign(this, init);
    }
}