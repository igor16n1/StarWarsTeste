import { ILista } from './../Interfaces/ilista';
export class ListaDTO implements ILista{
    count: number;
    next: string;
    previous?: any;
    results: any[];
}
