import { typePiloto } from "../types/index.js";
import { pilotoSchema } from "../types/schemas.js";
import validarComZod from "../utils/validateZod.js";

// Decorador que valida os dados do piloto usando o esquema Zod
@validarComZod(pilotoSchema)
// Classe Piloto que representa um piloto de avião
export class Piloto {
    // Atributos privados da classe Piloto
    #matricula;
    #nome;
    #habilitacaoAtiva;

    // Construtor da classe Piloto que recebe um objeto de tipoPiloto como parâmetro
    constructor(piloto: typePiloto) {
        // Inicialização dos atributos privados com base nos dados do objeto piloto recebido
        this.#matricula = piloto.matricula;
        this.#nome = piloto.nome;
        this.#habilitacaoAtiva = piloto.habilitacaoAtiva;
    }

    // Método getter para obter a matrícula do piloto
    get matricula(): string {
        return this.#matricula;
    }

    // Método getter para obter o nome do piloto
    get nome(): string {
        return this.#nome;
    }

    // Método getter para obter o status da habilitação do piloto
    get habilitacaoAtiva(): string {
        // Retorna "Ativo" se a habilitação estiver ativa, caso contrário retorna "Inativo"
        return this.#habilitacaoAtiva ? "Ativo" : "Inativo";
    }

    // Método setter para definir o status da habilitação do piloto
    set habilitacaoAtiva(valor: boolean) {
        // Converte o valor booleano para o formato apropriado e atribui ao atributo privado
        valor ? this.#habilitacaoAtiva = true : this.#habilitacaoAtiva = false;
    }

    // Método toString para retornar uma representação em string do objeto Piloto
    toString(): string {
        return `Matrícula: ${this.matricula}, Nome: ${this.nome}, Status da Habilitação: ${this.habilitacaoAtiva}`;
    }
}
