export interface ProductTypes {
  id: string;
  name: string;
  description: string;
  status: string;
  price: number;
  photo: Photo;
}

export interface CurrentUserType {
  authenticatedItem: AuthenticatedItem;
}
export interface AuthenticatedItem {
  id: string;
  email: string;
  name: string;
  cart?: CartEntity[] | null;
}
export interface CartEntity {
  id: string;
  quantity: number;
  product: Product;
}
export interface Product {
  name: string;
  price: number;
  photo: Photo;
}
export interface Photo {
  image?: Image | null;
}
export interface Image {
  publicUrlTransformed: string;
}
