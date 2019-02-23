import { PersonagemDTO } from './personagem-dto';
import { IPersonagensLista } from './../Interfaces/ipersonagens-lista';
export class PersonagensListaDTO implements IPersonagensLista {
    count: number;
    next: string;
    previous?: any;
    results: PersonagemDTO[];
}
