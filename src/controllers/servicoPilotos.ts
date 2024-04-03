import { Piloto } from "../models/piloto.js";
import { arquivo } from "../types/index.js";
import convert from "../utils/convert.js";
import carregaArquivo from "../utils/loadFile.js";

// Classe para representar o serviço relacionado aos Pilotos
export class ServicoPilotos {
    // Atributo privado para armazenar os pilotos
    #pilotos: Piloto[];

    // Construtor da classe ServicoPiloto que carrega os dados do arquivo especificado
    constructor(arq: arquivo) {
        // Inicializa a lista de pilotos
        this.#pilotos = [];
        // Carrega os dados do arquivo
        this.carregaDados(arq);
    }

    // Método para carregar os dados do arquivo na lista de pilotos
    carregaDados(arq: arquivo) {
        // Carrega os dados do arquivo usando a função carregaArquivo
        const dados = carregaArquivo(arq)
        // Itera sobre os dados carregados
        for (const pilot of dados) {
            // Converte os dados e cria um novo Piloto, adicionando-o à lista de pilotos
            const [m, n, h]: any[] = convert(pilot)
            this.#pilotos.push(new Piloto({ matricula: m, nome: n, habilitacaoAtiva: h }))
        }
    }

    // Método para recuperar um piloto pelo número de matrícula
    recupera(matricula: string) {
        // Retorna os pilotos que possuem a matrícula especificada
        return this.todos.find(pilot => pilot.matricula === matricula)
    }

    // Método getter para obter todos os pilotos
    get todos(): Piloto[] {
        return this.#pilotos;
    }
}
