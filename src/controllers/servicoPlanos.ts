import { PlanoDeVoo } from "../models/planoDeVoo.js";
import { arquivo } from "../types/index.js";
import convert from "../utils/convert.js";
import carregaArquivo from "../utils/loadFile.js";

// Classe para representar o serviço relacionado aos Planos de Voo
export class ServicoPlanos {
    // Atributo privado para armazenar os planos de voo
    #planosDeVoo: PlanoDeVoo[];

    // Construtor da classe ServicoPlanos que carrega os dados do arquivo especificado
    constructor(arq: arquivo) {
        // Inicializa a lista de planos de voo
        this.#planosDeVoo = [];
        // Carrega os dados do arquivo
        this.carregaDados(arq);
    }

    // Método para carregar os dados do arquivo na lista de planos de voo
    carregaDados(arq: arquivo) {
        // Carrega os dados do arquivo usando a função carregaArquivo
        const dados = carregaArquivo(arq)
        if (dados.length !== 0) {
            // Itera sobre os dados carregados
            for (const planoDeVoo of dados) {
                // Converte os dados e cria um novo PlanoDeVoo, adicionando-o à lista de planos de voo
                const [i, mP, iA, d, h, a, s, c]: any[] = convert(planoDeVoo)
                this.#planosDeVoo.push(new PlanoDeVoo(
                    {
                        id: String(i),
                        matricPiloto: mP,
                        idAerovia: iA,
                        data: d,
                        horario: h,
                        altitude: a,
                        slots: s,
                        cancelado: c
                    }
                ))
            }
        }
    }

    // Método getter para obter todos os planos de voo
    get todos(): PlanoDeVoo[] {
        return this.#planosDeVoo;
    }

    // Método para adicionar um plano de voo à lista de planos de voo
    consiste(plano: PlanoDeVoo): void {
        const index = this.#planosDeVoo.findIndex(item => item.id === plano.id);

        if (index !== -1) {
            this.#planosDeVoo[index] = plano;
        } else {
            this.#planosDeVoo.push(plano);
        }
    }

    // Método para recuperar um plano de voo pelo ID
    recupera(id: string) {
        // Retorna os planos de voo que possuem o ID especificado
        return this.todos.find(plano => plano.id === id)
    }

    // Método para filtrar os planos de voo por data
    filtrarPorData(date: Date): PlanoDeVoo[] {
        return this.#planosDeVoo.filter(plano => plano.data.toLocaleDateString("pt-BR") === date.toLocaleDateString("pt-BR"))
    }
}
