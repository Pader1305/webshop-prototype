export type Product = {
    '@context'?: string;
    '@id'?: string;
    '@type'?: string;
    id: number;
    name: string;
    image: string;
    price: number;
    offerPrice: number;
    isOffer: boolean;
    weight: number;
    kcal: number;
    stock: number;
};
