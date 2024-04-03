import { typeAerovia } from "../types/index.js";
import { aeroviaSchema } from "../types/schemas.js";
import validarComZod from "../utils/validateZod.js";

// Classe para representar uma aerovia
@validarComZod(aeroviaSchema)
export class Aerovia {
    // Atributos privados da classe Aerovia
    #id;
    #origem;
    #destino;
    #tamanho;

    // Construtor da classe Aerovia que recebe um objeto de typeAerovia como parâmetro
    constructor(aerovia: typeAerovia) {
        // Inicialização dos atributos privados com base nos dados do objeto aerovia recebido
        this.#id = aerovia.id;
        this.#origem = aerovia.origem;
        this.#destino = aerovia.destino;
        this.#tamanho = aerovia.tamanho;
    }

    // Método getter para obter o ID da aerovia
    get id() {
        return this.#id
    }

    // Método getter para obter a origem da aerovia
    get origem() {
        return this.#origem
    }

    // Método getter para obter o destino da aerovia
    get destino() {
        return this.#destino
    }

    // Método getter para obter o tamanho da aerovia
    get tamanho() {
        return this.#tamanho
    }

    get saveData() {
        return [this.#id, this.#origem, this.#destino, this.#tamanho]
    }

    // Método toString para retornar uma representação em string do objeto Aerovia
    toString(): string {
        return `Aerovia: ${this.origem}-${this.destino}, ${this.tamanho}Km/h`
    }
}
