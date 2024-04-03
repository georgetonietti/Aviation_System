import { Aerovia } from "../models/aerovia.js";
import { Piloto } from "../models/piloto.js";
import { PlanoDeVoo } from "../models/planoDeVoo.js";
import { OcupacaoAerovia } from "./ocupacaoAerovia.js";
import { ServicoAerovias } from "./servicoAerovias.js";
import { ServicoPilotos } from "./servicoPilotos.js";
import { ServicoPlanos } from "./servicoPlanos.js";
import salvarArquivo from "../utils/saveFile.js";

export class Menu {
    #servicoPilotos;
    #servicoAerovias;
    #servicoPlanos;
    #ocupacaoAerovia;
    #altitudesDisponiveis: number[] = [];

    constructor() {
        this.#servicoPilotos = new ServicoPilotos("src/data/pilotos.csv");
        this.#servicoAerovias = new ServicoAerovias("src/data/aerovias.csv");
        this.#servicoPlanos = new ServicoPlanos("src/data/planosDeVoo.csv");
        this.#ocupacaoAerovia = new OcupacaoAerovia("src/data/aeroviasOcupadas.csv");

        for (let altitude = 25000; altitude <= 35000; altitude += 1000) {
            this.#altitudesDisponiveis.push(altitude);
        }
    }

    // Método para obter a lista de aerovias
    listarAerovias(origem: string, destino: string) {
        const aerovias: Aerovia[] = this.#servicoAerovias.recupera(origem, destino);
        for (const aerovia of aerovias) {
            console.log(aerovia.toString())
        }
    }

    // Método para listar as altitudes livres
    listarAltitudesLivres(id: string, data: Date, horario: string) {
        const altitudesOcupadas: number[] = this.#ocupacaoAerovia.altitudesOcupadas(id, data, horario);
        const altitudesLivres = this.#altitudesDisponiveis.filter(altitude => !altitudesOcupadas.includes(altitude));
        for (const altitude of altitudesLivres) {
            console.log(altitude)
        }
    }

    // Método para submeter um plano de voo para aprovação
    aprovarPlanoDeVoo(id: string, mP: string, iA: string, d: Date, h: string, a: number) {
        try {
            const piloto: Piloto | undefined = this.#servicoPilotos.recupera(mP);
            if (piloto?.habilitacaoAtiva !== "Ativo") throw new Error("Piloto com habilitação inativa");
            if (!this.#altitudesDisponiveis.includes(a)) throw new Error("Altitude deve estar entre 25 e 35 mil pés, com distâncias de mil pés entre elas");

            const [hours, minutes] = h.split(":").map(Number);
            const slot: number[] = [];
            minutes !== 0
                ? slot.push(hours - 1, hours)
                : slot.push(hours - 1);

            for (const hr of slot) {
                const aeroviaEstaOcupada: boolean = this.#ocupacaoAerovia.isOcupado(iA, d, a, hr);
                if (aeroviaEstaOcupada) throw new Error("Altitude já está ocupada na data e horário requeridos");
            }

            const plano = new PlanoDeVoo({
                id: id,
                matricPiloto: mP,
                idAerovia: iA,
                data: d,
                horario: h,
                altitude: a,
                slots: slot,
            });

            this.#servicoPlanos.consiste(plano);
            this.#ocupacaoAerovia.ocupa(iA, d, a, slot)
            console.log(plano.id);

        } catch (error) {
            console.error(error);
        }
    }

    // Método para listar um plano de voo pelo ID
    listarPlano(id: string) {
        const plano = this.#servicoPlanos.recupera(id);
        if (plano === undefined) throw new Error("Plano de voo não encontrado");
        console.log(plano.toString());
    }

    // Método para listar os planos previstos para uma determinada data
    listarPlanosPorData(data: Date) {
        const planosFiltrados = this.#servicoPlanos.filtrarPorData(data);
        const planosAprovados = planosFiltrados?.filter(plano => plano.cancelado === false);
        if (planosAprovados) {
            for (const plano of planosAprovados) {
                const aerovia = this.#servicoAerovias.buscarPorId(plano.idAerovia);
                if (aerovia) {
                    console.log(`id: ${aerovia.id}, Origem: ${aerovia.origem}, Destino: ${aerovia.destino}`)
                } else {
                    console.log("Aerovia não encontrada")
                }
            }
        } else {
            console.log("Não há planos previstos para a data mencionada")
        }
    }

    // Método para listar a ocupação de aerovias em uma determinada data
    listarOcupacaoPorData(data: Date) {
        const aeroviasOcupadasFiltradas = this.#ocupacaoAerovia.filtrarPorData(data);
        if (aeroviasOcupadasFiltradas) {
            for (const aeroviasOcupadas of aeroviasOcupadasFiltradas) {
                const aerovia = this.#servicoAerovias.buscarPorId(aeroviasOcupadas.idAerovia);
                if (aerovia) {
                    console.log(`id: ${aerovia.id}, Origem: ${aerovia.origem}, Destino: ${aerovia.destino}`)
                } else {
                    console.log("Aerovia não encontrada")
                }
            }
        } else {
            console.log("Não há aerovias ocupadas na data mencionada")
        }
    }

    // Método para cancelar um plano de voo
    cancelarPlano(id: string) {
        const plano = this.#servicoPlanos.recupera(id);
        if (plano === undefined) throw new Error("Plano de voo não encontrado");
        plano.cancelarPlano()
        for (const slot of plano.slots) {
            this.#ocupacaoAerovia.libera(plano.idAerovia, plano.data, plano.altitude, slot)
        }
    }

    // Método para encerrar o sistema e salvar os dados
    encerrarSistema() {
        salvarArquivo("src/data/planosDeVoo.csv", this.#servicoPlanos.todos)
        salvarArquivo("src/data/aeroviasOcupadas.csv", this.#ocupacaoAerovia.todas)
        process.exit(0)
    }

}
