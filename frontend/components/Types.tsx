export interface ProductTypes {
  id: string;
  name: string;
  description: string;
  status: string;
  price: number;
  photo: {
    image: {
      id: string;
      publicUrlTransformed: string;
    };
  };
}
