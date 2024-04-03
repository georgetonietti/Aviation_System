import nReadlines from "n-readlines";
import { arquivo } from "../types/index.js";

// Função para carregar um arquivo
export default function carregaArquivo(narq: arquivo): any[] {
    // Abre o arquivo usando a biblioteca n-readlines
    let arq = new nReadlines(narq);
    let buf: any = "";
    let linha = "";
    let dados: string[][] = [];

    // Itera sobre as linhas do arquivo
    while (buf = arq.next()) {
        // Converte a linha para string no formato utf8
        linha = buf.toString('utf8');
        // Divide a linha em elementos usando ',' como delimitador e adiciona à matriz de dados
        dados.push(linha.split(';'));
    }

    // Retorna os dados lidos do arquivo
    return dados
}
