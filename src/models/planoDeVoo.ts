import { typePlanoDeVoo } from "../types/index.js";
import { planoDeVooSchema } from "../types/schemas.js";
import validarComZod from "../utils/validateZod.js";

// Classe para representar um Plano de Voo
@validarComZod(planoDeVooSchema)
export class PlanoDeVoo {
    // Atributos privados da classe PlanoDeVoo
    #id; // ID do Plano de Voo
    #matricPiloto; // Matrícula do piloto associado ao Plano de Voo
    #idAerovia; // ID da aerovia associada ao Plano de Voo
    #data; // Data do Plano de Voo
    #horario; // Horário do Plano de Voo
    #altitude; // Altitude do Plano de Voo
    #slots; // Slots do Plano de Voo
    #cancelado; // Indicador se o Plano de Voo foi cancelado

    // Construtor da classe PlanoDeVoo que recebe um objeto de typePlanoDeVoo como parâmetro
    constructor(planoDeVoo: typePlanoDeVoo) {
        // Inicialização dos atributos privados com base nos dados do objeto planoDeVoo recebido
        this.#id = planoDeVoo.id;
        this.#matricPiloto = planoDeVoo.matricPiloto;
        this.#idAerovia = planoDeVoo.idAerovia;
        this.#data = planoDeVoo.data;
        this.#horario = planoDeVoo.horario;
        this.#altitude = planoDeVoo.altitude;
        this.#slots = planoDeVoo.slots;
        // Verifica se o planoDeVoo tem o atributo cancelado definido e, se não tiver, define como false
        this.#cancelado = planoDeVoo.cancelado ? planoDeVoo.cancelado : false;
    }

    // Método getter para obter o ID do Plano de Voo
    get id(): string {
        return this.#id;
    }

    // Método getter para obter a matrícula do piloto associado ao Plano de Voo
    get matricPiloto(): string {
        return this.#matricPiloto;
    }

    // Método getter para obter o ID da aerovia associada ao Plano de Voo
    get idAerovia(): string {
        return this.#idAerovia;
    }

    // Método getter para obter a data do Plano de Voo
    get data() {
        return this.#data;
    }

    // Método getter para obter o horário do Plano de Voo
    get horario(): string | number {
        return this.#horario;
    }

    // Método getter para obter a altitude do Plano de Voo
    get altitude(): number {
        return this.#altitude;
    }

    // Método getter para obter os slots do Plano de Voo
    get slots(): number[] {
        return this.#slots;
    }

    // Método getter para verificar se o Plano de Voo foi cancelado
    get cancelado(): boolean {
        return this.#cancelado;
    }

    // Método para cancelar o Plano de Voo
    cancelarPlano() {
        this.#cancelado = true;
    }

    // Método para representar o objeto PlanoDeVoo como uma string formatada
    toString(): string {
        let str = `id: ${this.id} \nMatriculaPiloto: ${this.matricPiloto} \nidAerovia: ${this.idAerovia} \n`;
        str += `Data: ${this.data.toLocaleDateString("pt-BR")} \nHorario: ${this.horario} \nAltitude: ${this.altitude} \n`
        str += `Slots: ${this.slots.join(', ')} \nCancelado: ${this.cancelado}`;
        return str;
    }

    // Método getter para retornar os dados do Plano de Voo como um array
    get saveData() {
        return [
            this.#id,
            this.#matricPiloto,
            this.#idAerovia,
            this.#data,
            this.#horario,
            this.#altitude,
            this.#slots,
            this.#cancelado
        ]
    }
}
