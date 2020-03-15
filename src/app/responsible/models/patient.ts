import * as moment from 'moment';

export interface Patient {
  id?: string;
  name: string;
  birth: moment.Moment;
  responsibleId: string;
}
