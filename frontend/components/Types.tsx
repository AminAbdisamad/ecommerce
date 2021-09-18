// query{
// 	Order(where:{id:"6143d73e33ed207e8c8b41cd"}){

//     id
//     total
//     charge

//     user{
//       name
//       email
//       isAdmin
//     }
//     items{
//     name
//     description
//     price
//     quantity
//       photo{
//         id
//         image{
//           publicUrlTransformed
//         }
//       }
//     }

//   }
// }

export interface OrderType {
  id: string;
  total: number;
  charge: string;
  items: ProductTypes[] | null;
  user: AuthenticatedItem;
}
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
