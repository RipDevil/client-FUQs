import { FuqType } from 'pages/fuq/model';

export interface UserType {
  login: string;
  _crdate: string;
  fuqs: FuqType[];
  password: string;
  deleted: boolean;
} // password is presented? lol?
