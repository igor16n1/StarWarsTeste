import { VeiculoDTO } from './veiculo-dto';
import { ILista } from './../Interfaces/ilista';
export class VeiculosListaDTO implements ILista {
    count: number;
    next: string;
    previous?: any;
    results: VeiculoDTO[];
}
