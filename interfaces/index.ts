export interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export interface PropertyProps {
  id?: string | number;
  name: string;
  address: {
    state: string;
    city: string;
    country: string};
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;};
  image: string;
  discount?: string;
}

export interface ReviewProps {
  id: string | number;
  propertyId: string | number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BookingProps {
  propertyId: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}