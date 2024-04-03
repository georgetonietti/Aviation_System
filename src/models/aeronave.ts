import {
    typeAeronave,
    typeAeronaveCarga,
    typeAeronaveComercial,
    typeAeronaveParticular,
    typeAeronavePassageiros
} from "../types/index.js";
import {
    aeronaveCargaSchema,
    aeronaveComercialSchema,
    aeronaveParticularSchema,
    aeronavePassageirosSchema,
    aeronaveSchema
} from "../types/schemas.js";
import validarComZod from "../utils/validateZod.js";

// Decorador que valida os dados das classes usando o esquema Zod
// @validarComZod()

// Classe base para todas as aeronaves
@validarComZod(aeronaveSchema)
export class Aeronave {
    // Atributos privados da classe Aeronave
    #prefixo;
    #velocidadeCruzeiro;
    #autonomia;

    // Construtor da classe Aeronave que recebe um objeto de tipoAeronave como parâmetro
    constructor(aeronave: typeAeronave) {
        // Inicialização dos atributos privados com base nos dados do objeto aeronave recebido
        this.#prefixo = aeronave.prefixo;
        this.#velocidadeCruzeiro = aeronave.velocidadeCruzeiro;
        this.#autonomia = aeronave.autonomia;
    }

    // Método getter para obter o prefixo da aeronave
    get prefixo() {
        return this.#prefixo
    }

    // Método getter para obter a velocidade de cruzeiro da aeronave
    get velocidadeCruzeiro() {
        return this.#velocidadeCruzeiro
    }

    // Método getter para obter a autonomia da aeronave
    get autonomia() {
        return this.#autonomia
    }

    // Método toString para retornar uma representação em string do objeto Aeronave
    toString(): string {
        return `Aeronave: ${this.prefixo}, Vel: ${this.velocidadeCruzeiro}Km/h, Autonomi: ${this.autonomia}Km`
    }
}

// Classe para representar uma aeronave particular usando o conceito de herança
@validarComZod(aeronaveParticularSchema)
export class AeronaveParticular extends Aeronave {
    // Atributo privado para armazenar o responsável pela manutenção
    #respManutencao;

    // Construtor da classe AeronaveParticular que recebe um objeto de tipoAeronaveParticular como parâmetro
    constructor(aeronaveParticular: typeAeronaveParticular) {
        // Chama o construtor da classe base
        super(aeronaveParticular)
        // Inicializa o atributo privado com base nos dados do objeto aeronaveParticular recebido
        this.#respManutencao = aeronaveParticular.respManutencao;
    }

    // Método getter para obter o responsável pela manutenção da aeronave particular
    get respManutencao() {
        return this.#respManutencao
    }

    // Método toString para retornar uma representação em string do objeto AeronaveParticular
    toString(): string {
        return super.toString() + `, Responsável pela manutenção: ${this.respManutencao}`
    }
}

// Classe para representar uma aeronave comercial usando o conceito de herança
@validarComZod(aeronaveComercialSchema)
export class AeronaveComercial extends Aeronave {
    // Atributo privado para armazenar o nome da companhia aérea
    #nomeCIA;

    // Construtor da classe AeronaveComercial que recebe um objeto de tipoAeronaveComercial como parâmetro
    constructor(aeronaveComercial: typeAeronaveComercial) {
        // Chama o construtor da classe base
        super(aeronaveComercial)
        // Inicializa o atributo privado com base nos dados do objeto aeronaveComercial recebido
        this.#nomeCIA = aeronaveComercial.nomeCia;
    }

    // Método getter para obter o nome da companhia aérea
    get nomeCIA() {
        return this.#nomeCIA
    }

    // Método toString para retornar uma representação em string do objeto AeronaveComercial
    toString(): string {
        return super.toString() + `, CIA: ${this.nomeCIA}`
    }
}

// Classe para representar uma aeronave de passageiros usando o conceito de herança
@validarComZod(aeronavePassageirosSchema)
export class AeronavePassageiros extends AeronaveComercial {
    // Atributo privado para armazenar a capacidade máxima de passageiros
    #maxPassageiros;

    // Construtor da classe AeronavePassageiros que recebe um objeto de tipoAeronavePassageiros como parâmetro
    constructor(aeronavePassageiros: typeAeronavePassageiros) {
        // Chama o construtor da classe base
        super(aeronavePassageiros)
        // Inicializa o atributo privado com base nos dados do objeto aeronavePassageiros recebido
        this.#maxPassageiros = aeronavePassageiros.maxPassageiros;
    }

    // Método getter para obter a capacidade máxima de passageiros da aeronave
    get maxPassageiros() {
        return this.#maxPassageiros
    }

    // Método toString para retornar uma representação em string do objeto AeronavePassageiros
    toString(): string {
        return super.toString() + `, Capacidade máxima de passageiros: ${this.maxPassageiros}`
    }
}

// Classe para representar uma aeronave de carga usando o conceito de herança
@validarComZod(aeronaveCargaSchema)
export class AeronaveCarga extends AeronaveComercial {
    // Atributo privado para armazenar a capacidade máxima de carga
    #pesoMax;

    // Construtor da classe AeronaveCarga que recebe um objeto de tipoAeronaveCarga como parâmetro
    constructor(aeronaveCarga: typeAeronaveCarga) {
        // Chama o construtor da classe base
        super(aeronaveCarga)
        // Inicializa o atributo privado com base nos dados do objeto aeronaveCarga recebido
        this.#pesoMax = aeronaveCarga.pesoMax;
    }

    // Método getter para obter a capacidade máxima de carga da aeronave
    get pesoMax() {
        return this.#pesoMax
    }

    // Método toString para retornar uma representação em string do objeto AeronaveCarga
    toString(): string {
        return super.toString() + `, Capacidade de carga: ${this.pesoMax}`
    }
}
