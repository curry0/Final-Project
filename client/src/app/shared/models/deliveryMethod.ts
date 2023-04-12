export interface DeliveryMethod {
    [x: string]: any;
    id: number;
    shortName: string;
    deliveryTime: string;
    description: string;
    price: number;
}
