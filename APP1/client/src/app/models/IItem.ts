import { Photo } from "./IPhoto";

export interface IItem {
    productID:          number;
    productname:        string;
    productDescription: string;
    photoUrl:           string;
    categoryName:       string;
    unitPrice:          number;
    unitsInStock:       number;
    photos:             Photo[];
}
