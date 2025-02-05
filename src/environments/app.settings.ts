import { AppSettings } from 'src/app/@core/models/app-settings';
import { environment } from './environment';
import { name } from '../../package.json';
import { version } from '../../package.json';

export const appSettings: AppSettings = {
  name,
  version,
  environment: environment.key,
  apiUrl: environment.apiUrl,
  apiProtocol: environment.apiProtocol
};
