import { IPersonagem } from './ipersonagem';
export interface IPersonagensLista {
    count: number;
    next: string;
    previous?: any;
    results: IPersonagem[];
}
