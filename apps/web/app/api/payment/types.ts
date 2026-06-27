export type CardItem = {
  id: string;
  type: string;
  mask: string;
  issuer: string;
  default: boolean;
};

export type AddCardResponse = {
  link: string;
  id: string;
};
