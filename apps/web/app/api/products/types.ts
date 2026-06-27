export type CategoryType = 'pension' | 'travel' | 'borrower' | 'investment' | 'accumulative' | 'children' | 'business';

export type ProductList = {
  display: true;
  mode: string;
  name: ProductNames;
  title: string;
  subtitle: string;
  description: '';
  icon: string;
  category: CategoryType;
  image: string;
  banner: string;
  discount: {
    halykbank: string;
  };
  stages: null;
}[];

export type ProductOverview = {
  display: boolean;
  mode: string;
  name: ProductNames;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image: string;
  banner: string;
  header?: string;
  discount: {
    halykbank: string;
  };
  stages: Stage[];
};

export type Stage = MainStage | AuxiliaryStage | MediaStage | NestedStage;

export type MainStage = {
  title: string;
  type: 'main';
  items: {
    title: string;
    icon: string;
  }[];
};

export type AuxiliaryStage = {
  title: string;
  type: 'auxiliary';
  items: {
    title: string;
    description: string;
    url: string;
  }[];
};

export type NestedStage = {
  title: string;
  type: 'nested';
  items: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  }[];
};

export type MediaStage = {
  title: string;
  type: 'media';
  items: {
    title: string;
    url: string;
  }[];
};

export type GetEgovQrResponse = {
  link: string;
  sessionLifetime: number;
  id: string;
};

export type ProductStatement = {
  isExists: boolean;
  processInstanceId: string;
  source: string;
  statusCode: StatusCode;
};

export type CompanyFilialType = {
  address: string;
  city: string;
  number: string;
  office: string;
  workTime: string;
};
