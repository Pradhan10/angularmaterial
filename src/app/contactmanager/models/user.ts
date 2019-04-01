import {Note} from "./note";
import {Address} from "./address";

export class User {
  id: number;
  birthDate: Date;
  name: string;
  avatar: string;
  bio: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
  website: string;
  company: Company;

  notes: Note[] = [];
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
