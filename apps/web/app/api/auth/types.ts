export type AuthCredentials = { grant_type: 'casKey' | 'password' | 'code' | 'cas' | 'token'; client_id: string; client_secret: string };

export type GetLastCommitHashResponse = { version: string; buildTime: string };

export type AuthWithEgovResponse = {
  id: string;
  sessionLifetime: number;
  link: string;
};
