import { NaveDTO } from './nave-dto';
import { ILista } from './../Interfaces/ilista';
export class NavesListaDTO implements ILista {
    count: number;
    next: string;
    previous?: any;
    results: NaveDTO[];
}
