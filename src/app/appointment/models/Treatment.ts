import { Tooth } from './Tooth';

export interface Treatment {
    id: string;
    description: string;
    toothNumber: Array<Tooth>;
}