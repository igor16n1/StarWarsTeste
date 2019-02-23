import { TratamentoErroDTO } from './tratamento-erro-dto';
import { HttpErrorResponse } from "@angular/common/http";

export class TratamentoErro {
    private tratamentoErroDTO: TratamentoErroDTO;
    private caminhoNaoEncontrado: string = "Caminho não encontrado";
    private erroInesperado: string = "Erro inesperado";
    MontarMensagemErro(erro: HttpErrorResponse)
    {
        if(erro.status == 400 && erro.error.detail != undefined)
        {
            this.MontarObjeto(erro.status.toString(), erro.error.detail);
        }
        else if(erro.status == 400 && erro.error.detail == undefined)
        {
            this.MontarObjeto(erro.status.toString(), this.caminhoNaoEncontrado);
        }
        else
        {
            this.MontarObjeto(erro.status.toString(), this.erroInesperado);
        }
    }
    MontarObjeto(codigo: string, mensagem: string)
    {
        this.tratamentoErroDTO.codigo = codigo;
        this.tratamentoErroDTO.mensagem = mensagem;
    }
}
