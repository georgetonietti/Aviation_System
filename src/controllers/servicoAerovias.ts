import { Aerovia } from "../models/aerovia.js";
import { arquivo } from "../types/index.js";
import convert from "../utils/convert.js";
import carregaArquivo from "../utils/loadFile.js";

// Classe para representar o serviço relacionado às Aerovias
export class ServicoAerovias {
    // Atributo privado para armazenar as aerovias
    #aerovias: Aerovia[];

    // Construtor da classe ServicoAerovia que carrega os dados do arquivo especificado
    constructor(arq: arquivo) {
        // Inicializa a lista de aerovias
        this.#aerovias = [];
        // Carrega os dados do arquivo
        this.carregaDados(arq);
    }

    // Método para carregar os dados do arquivo na lista de aerovias
    carregaDados(arq: arquivo) {
        // Carrega os dados do arquivo usando a função carregaArquivo
        const dados = carregaArquivo(arq)
        // Itera sobre os dados carregados
        for (const pilot of dados) {
            // Converte os dados e cria uma nova Aerovia, adicionando-a à lista de aerovias
            const [i, o, d, t]: any[] = convert(pilot)
            this.#aerovias.push(new Aerovia({ id: i, origem: o, destino: d, tamanho: t }))
        }
    }

    // Método para recuperar as aerovias com base na origem e destino especificados
    recupera(origem: string, destino: string) {
        // Retorna as aerovias que possuem a origem e destino especificados
        return this.#aerovias.filter(aerovia => aerovia.origem === origem && aerovia.destino === destino)
    }

    buscarPorId(id: string) {
        return this.todas.find(aerovia => aerovia.id === id);
    }

    // Método getter para obter todas as aerovias
    get todas() {
        return this.#aerovias;
    }
}
