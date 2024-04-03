import fs from 'fs'; // Importa o módulo 'fs' para lidar com operações de sistema de arquivos
import { PlanoDeVoo } from '../models/planoDeVoo';
import { AeroviaOcupada } from '../models/aeroviaOcupada';

// Função para salvar os dados em um arquivo
export default function salvarArquivo<T extends PlanoDeVoo | AeroviaOcupada>(arquivo: string, dados: T[]) {
    // Mapeia os objetos de dados para seus respectivos arrays de dados salváveis
    const dataArray = dados.map(objeto => objeto?.saveData);
    // Transforma cada elemento do tipo array em JSON
    const dataJSON = dataArray.map(arr => arr.map(e => Array.isArray(e) ? JSON.stringify(e) : e));
    // Converte os arrays de dados em linhas de texto separadas por ponto e vírgula e junta-os em uma única string
    const dadosCSV: string = dataJSON.map(arr => arr.join(";")).join("\n");

    // Escreve a string de dados CSV no arquivo especificado
    fs.writeFileSync(arquivo, dadosCSV, 'utf-8');
}
