export interface ProductTypes {
  id: string;
  name: string;
  description: string;
  status: string;
  photo: {
    image: {
      id: string;
      publicUrlTransformed: string;
    };
  };
}
