import { EspecieDTO } from './especie-dto';
import { ILista } from './../Interfaces/ilista';
export class EspeciesListaDTO implements ILista {
    count: number;
    next: string;
    previous?: any;
    results: EspecieDTO[];
}
