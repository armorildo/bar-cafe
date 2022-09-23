export interface ProductDTO {
 name: string;
 unitPrice: string;
}

export class Product {
 name: string;
 unitPrice: string;

 constructor(dto?: ProductDTO) {
  this.name = dto?.name ?? '';
  this.unitPrice = dto?.unitPrice ?? '';
 }

 toDTO(): ProductDTO {
  const result: ProductDTO = {} as ProductDTO;
  result.name = this.name;
  result.unitPrice = this.unitPrice;
  return result;
 }
}
