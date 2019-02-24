import { PlanetaDTO } from './planeta-dto';
import { ILista } from './../Interfaces/ilista';
export class PlanetasListaDTO implements ILista {
    count: number;
    next: string;
    previous?: any;
    results: PlanetaDTO[];
}
