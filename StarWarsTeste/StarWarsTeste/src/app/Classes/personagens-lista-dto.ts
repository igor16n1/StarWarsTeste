import { PersonagemDTO } from './personagem-dto';
import { ILista } from './../Interfaces/ilista';
export class PersonagensListaDTO implements ILista {
    count: number;
    next: string;
    previous?: any;
    results: PersonagemDTO[];
}
