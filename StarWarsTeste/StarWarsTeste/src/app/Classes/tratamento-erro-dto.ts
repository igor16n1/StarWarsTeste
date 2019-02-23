import { ITratamentoErroDTO } from './../Interfaces/itratamento-erro-dto';
export class TratamentoErroDTO implements ITratamentoErroDTO {
    mensagem: string;
    codigo: string;
}
