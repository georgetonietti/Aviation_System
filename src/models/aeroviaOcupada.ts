import { typeAeroviaOcupada } from "../types/index.js";
import { aeroviaOcupadaSchema } from "../types/schemas.js";
import validarComZod from "../utils/validateZod.js";

// Classe para representar uma Aerovia Ocupada
@validarComZod(aeroviaOcupadaSchema)
export class AeroviaOcupada {
    // Atributos privados da classe AeroviaOcupada
    #idAerovia;
    #data;
    #altitude;
    #slot: number[] = [];

    // Construtor da classe AeroviaOcupada que recebe um objeto de typeAeroviaOcupada como parâmetro
    constructor(aeroviaOcupada: typeAeroviaOcupada) {
        // Inicialização dos atributos privados com base nos dados do objeto aeroviaOcupada recebido
        this.#idAerovia = aeroviaOcupada.idAerovia;
        this.#data = aeroviaOcupada.data;
        this.#altitude = aeroviaOcupada.altitude;
        if (Array.isArray(aeroviaOcupada.slot)) {
            aeroviaOcupada.slot.forEach((value) => {
                this.#slot[value] = value;
            });
        } else {
            this.#slot[aeroviaOcupada.slot] = aeroviaOcupada.slot;
        }

    }

    // Método getter para obter o ID da Aerovia Ocupada
    get idAerovia() {
        return this.#idAerovia
    }

    // Método getter para obter a data da Aerovia Ocupada
    get data() {
        return this.#data
    }

    // Método getter para obter a altitude da Aerovia Ocupada
    get altitude() {
        return this.#altitude
    }

    // Método getter para obter o slot da Aerovia Ocupada
    get slot() {
        return this.#slot
    }

    // Método getter para obter todos os dados da Aerovia Ocupada
    get saveData() {
        return [this.#idAerovia, this.#data, this.#altitude, this.#slot]
    }

}
