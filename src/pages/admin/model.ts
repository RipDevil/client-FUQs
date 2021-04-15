import { FuqType } from 'pages/fuq/model';

export interface UserType {
  login: string;
  fuqs: FuqType[];
  deleted: boolean;
} // password is presented? lol?
