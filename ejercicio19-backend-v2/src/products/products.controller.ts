import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto, updateProductDto } from './dto/create.product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){

    }

@Get()
getProducts(){
    return this.productsService.getProducts();
}

@Post()
createProduct(@Body()product:CreateProductDto ){
    return this.productsService.createProduct(product)
}

@Put('update')
updateProduct(@Body()product:updateProductDto, @Query('id') id:string){
    return this.productsService.updateProduct(product, id)
}

@Delete('delete')
deleteProduct(@Query('id') id: string ){
    return this.productsService.deleteProduct(id)
}

}
