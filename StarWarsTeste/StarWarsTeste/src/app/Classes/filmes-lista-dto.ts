import { FilmeDTO } from './filme-dto';
import { ILista } from './../Interfaces/ilista';
export class FilmesListaDTO implements ILista {
    count: number;
    next: string;
    previous?: any;
    results: FilmeDTO[];
}
