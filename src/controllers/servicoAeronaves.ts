import { Aeronave, AeronaveParticular, AeronaveCarga, AeronavePassageiros } from "../models/aeronave.js";
import { arquivo } from "../types/index.js";
import convert from "../utils/convert.js";
import carregaArquivo from "../utils/loadFile.js";

// Classe para representar o serviço relacionado às Aeronaves
export class ServicoAeronaves {
    // Atributo privado para armazenar as aeronaves
    #aeronaves: Aeronave[];

    // Construtor da classe ServicoAeronaves que carrega os dados do arquivo especificado
    constructor(arq: arquivo) {
        // Inicializa a lista de aeronaves
        this.#aeronaves = [];
        // Carrega os dados do arquivo
        this.carregaDados(arq);
    }

    // Método para carregar os dados do arquivo na lista de aeronaves
    carregaDados(arq: arquivo) {
        // Carrega os dados do arquivo usando a função carregaArquivo
        const dados = carregaArquivo(arq)
        // Itera sobre os dados carregados
        for (const aircraft of dados) {
            let p: string, vC: number, a: number, r: string, n: string, m: number;
            // Verifica o tipo de aeronave com base no primeiro item de cada linha dos dados
            switch (aircraft[0]) {
                // Caso seja uma Aeronave Particular
                case "ANP":
                    // Converte os dados e cria uma nova AeronaveParticular, adicionando-a à lista de aeronaves
                    [p, vC, a, r] = convert(aircraft);
                    this.#aeronaves.push(new AeronaveParticular(
                        { prefixo: p, velocidadeCruzeiro: vC, autonomia: a, respManutencao: r }
                    ));
                    break;
                // Caso seja uma Aeronave de Passageiros
                case "ANCP":
                    // Converte os dados e cria uma nova AeronavePassageiros, adicionando-a à lista de aeronaves
                    [p, vC, a, n, m] = convert(aircraft);
                    this.#aeronaves.push(new AeronavePassageiros(
                        { prefixo: p, velocidadeCruzeiro: vC, autonomia: a, nomeCia: n, maxPassageiros: m }
                    ));
                    break;
                // Caso seja uma Aeronave de Carga
                case "ANCC":
                    // Converte os dados e cria uma nova AeronaveCarga, adicionando-a à lista de aeronaves
                    [p, vC, a, n, m] = convert(aircraft);
                    this.#aeronaves.push(new AeronaveCarga(
                        { prefixo: p, velocidadeCruzeiro: vC, autonomia: a, nomeCia: n, pesoMax: m }
                    ));
                    break;
                // Caso seja desconhecido, lança um erro
                default:
                    throw new Error("Aeronave desconhecida!");
            }
        }
    }

    // Método getter para obter todas as aeronaves
    get todas(): Aeronave[] {
        return this.#aeronaves;
    }
}