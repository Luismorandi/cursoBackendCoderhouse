import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, updateProductDto } from './dto/create.product.dto';
import { IProduct } from './interfaces/IProducts';

@Injectable()
export class ProductsService {
constructor(@InjectModel('products') private productsModel: Model<IProduct>){}

    async getProducts(){
        return await this.productsModel.find()
    }

   async  createProduct(product: CreateProductDto){
        try {
            const { title, value, thumbnail, stock } = product
          
            const newProduct = await this.productsModel.create({
                title,
                value,
                thumbnail,
                stock,
            })
            return newProduct
        } catch (err) {
            console.log(err)
        }

    }

   async  updateProduct(product:updateProductDto, id: string){

            try {
            const { title, value, thumbnail, stock } = product
            const productUpdate = await this.productsModel.findByIdAndUpdate(id, {
                title,
                value,
                thumbnail,
                stock,
            })
            return await this.productsModel.findById(id)
        } catch (err) {
            console.log(err)
        }
        


    }
    
   async deleteProduct(id:string){
        try {
            const deleteProduct = await this.productsModel.deleteOne({_id:id})
            return deleteProduct
        } catch (err) {
            console.log(err)
        }
        
    }
}
