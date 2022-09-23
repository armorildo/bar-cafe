import { Product } from "./product";

export interface CategoryDTO {
 id: string,
 name: string;
 products: Product[];

}

export class Category {

 id: string;
 name: string;
 products: Product[];

 constructor(dto?: CategoryDTO) {
  this.id = dto?.id ?? '';
  this.name = dto?.name ?? '';
  this.products = dto?.products ?? [];
 }

 toDTO(): CategoryDTO {
  const result: CategoryDTO = {} as CategoryDTO;
  result.id = this.id;
  result.name = this.name;
  result.products = this.products;
  return result;
 }
}
