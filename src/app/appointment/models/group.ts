import { Question } from './question';

export interface Group {
  id?: string;
  group: string;
  order: number;
  idLang: string;
  questions?: Array<Question>;
}
