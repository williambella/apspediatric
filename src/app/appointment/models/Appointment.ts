import { Treatment } from './Treatment';
import { Procedure } from './Procedure';

export interface Appointment {
    id?: string;
    description: string;
    patientId: string;
    treatments: Array<Treatment>;
    procedures: Array<Procedure>;
}