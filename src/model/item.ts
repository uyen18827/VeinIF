import { Precondition } from "./paragraph";

export interface Items {
    itemName: string,
    description?: string;
    itemImg?: string,
    itemQty: number,
    itemCode: string,
    precondition?: Precondition;
    pickedUp?: boolean;
}
//each itemCode must be unique
//Don't use special characters in itemCode.