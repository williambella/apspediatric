import { Contact } from './contact';
import { Patient } from './patient';

export interface Responsible {
  id?: string;
  name: string;
  parentalDegree: string;
  patients?: Array<Patient>;
  contacts?: Array<Contact>;
}
