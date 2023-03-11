export class CreateProductDto{
    title: String
    value: Number
    thumbnail: String
    stock:Number
}

export class updateProductDto{
    title?: String
    value?: Number
    thumbnail?: String
    stock?:Number
}