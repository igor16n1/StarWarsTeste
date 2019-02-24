import { IPersonagem } from './ipersonagem';
export interface ILista {
    count: number;
    next: string;
    previous?: any;
    results: any[];
}
