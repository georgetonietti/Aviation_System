import { AeroviaOcupada } from "../models/aeroviaOcupada.js";
import { arquivo } from "../types/index.js";
import convert from "../utils/convert.js";
import carregaArquivo from "../utils/loadFile.js";

// Classe para representar o serviço relacionado à ocupação de aerovias
export class OcupacaoAerovia {
    // Atributo privado para armazenar as aerovias ocupadas
    #aeroviasOcupadas: AeroviaOcupada[];

    // Construtor da classe OcupacaoAerovia que carrega os dados do arquivo especificado
    constructor(arq: arquivo) {
        // Inicializa a lista de aerovias ocupadas
        this.#aeroviasOcupadas = [];
        // Carrega os dados do arquivo
        this.carregaDados(arq);
    }

    // Método para carregar os dados do arquivo na lista de aerovias ocupadas
    carregaDados(arq: arquivo) {
        // Carrega os dados do arquivo usando a função carregaArquivo
        const dados = carregaArquivo(arq)
        if (dados.length !== 0) {
            // Itera sobre os dados carregados
            for (const aeroviaOcupado of dados) {
                // Converte os dados e cria uma nova AeroviaOcupada, adicionando-a à lista de aerovias ocupadas
                const [iA, d, a, s]: any[] = convert(aeroviaOcupado)
                this.#aeroviasOcupadas.push(new AeroviaOcupada({
                    idAerovia: iA,
                    data: d,
                    altitude: a,
                    slot: s.map(Number)
                })
                )
            }
        }
    }

    // Método para obter as altitudes ocupadas em uma determinada aerovia e data
    altitudesOcupadas(idAerovia: string, data: Date, horario: string) {
        const [hours, minutes] = horario.split(":").map(Number);
        if (minutes !== 0) {
            return this.#aeroviasOcupadas
                .filter(aerovia =>
                    aerovia.idAerovia === idAerovia
                    && aerovia.data.toLocaleDateString("pt-BR") === data.toLocaleDateString("pt-BR")
                    && aerovia.slot[hours - 1] !== null
                    && aerovia.slot[hours] !== null)
                .map(aerovia => aerovia.altitude);
        }
        return this.#aeroviasOcupadas
            .filter(aerovia =>
                aerovia.idAerovia === idAerovia
                && aerovia.data.toLocaleDateString("pt-BR") === data.toLocaleDateString("pt-BR")
                && aerovia.slot[hours - 1] !== null)
            .map(aerovia => aerovia.altitude);
    }

    // Método para obter os slots ocupados em uma determinada aerovia, data e altitude
    slotsOcupados(idAerovia: string, data: Date, altitude: number) {
        return this.#aeroviasOcupadas
            .filter(aerovia =>
                aerovia.idAerovia === idAerovia
                && aerovia.data.toLocaleDateString("pt-BR") === data.toLocaleDateString("pt-BR")
                && aerovia.altitude === altitude)
            .map(aerovia => aerovia.slot.values);
    }

    // Método para ocupar um slot em uma determinada aerovia, data, altitude e slot
    ocupa(idAerovia: string, data: Date, altitude: number, slot: number | number[]) {
        return this.#aeroviasOcupadas.push(new AeroviaOcupada({
            idAerovia: idAerovia,
            data: data,
            altitude: altitude,
            slot: slot
        })
        )
    }

    // Método para liberar um slot em uma determinada aerovia, data, altitude e slot
    libera(idAerovia: string, data: Date, altitude: number, slot: number) {
        this.#aeroviasOcupadas = this.#aeroviasOcupadas
            .filter(aerovia =>
                aerovia.idAerovia !== idAerovia
                || aerovia.data.toLocaleDateString("pt-BR") !== data.toLocaleDateString("pt-BR")
                || aerovia.altitude !== altitude
                || aerovia.slot[slot] !== slot
            )
    }

    // Método para verificar se um slot está ocupado em uma determinada aerovia, data, altitude e slot
    isOcupado(idAerovia: string, data: Date, altitude: number, slot: number) {
        return this.#aeroviasOcupadas
            .some(aerovia =>
                aerovia.idAerovia === idAerovia
                && aerovia.data.toLocaleDateString("pt-BR") === data.toLocaleDateString("pt-BR")
                && aerovia.altitude === altitude
                && aerovia.slot.includes(slot)
            )
    }

    filtrarPorData(date: Date): AeroviaOcupada[] {
        return this.#aeroviasOcupadas.filter(aerovia => aerovia.data.toLocaleDateString("pt-BR") === date.toLocaleDateString("pt-BR"))
    }

    get todas() {
        return this.#aeroviasOcupadas;
    }
}
