import { Category } from "./category";

export interface BusinessDataDTO {
  nuis: string,
  businessName: string;
  logo: string;
  categories: Category[];

}

export class BusinessData {

  nuis: string;
  businessName: string;
  logo: string;
  categories: Category[];

  constructor(dto?: BusinessDataDTO) {
    this.nuis = dto?.nuis ?? '';
    this.businessName = dto?.businessName ?? '';
    this.logo = dto?.logo ?? '';
    this.categories = dto?.categories ?? [];
  }

  toDTO(): BusinessDataDTO {
    const result: BusinessDataDTO = {} as BusinessDataDTO;
    result.nuis = this.nuis;
    result.businessName = this.businessName;
    result.logo = this.logo;
    result.categories = this.categories;
    return result;
  }
}
