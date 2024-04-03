import { Menu } from "./controllers/menu.js";
import promptsync from 'prompt-sync';
import parseDate from "./utils/convertDate.js";
const prompt = promptsync({ sigint: true });

let fim: boolean = false; // Variável para controlar o término do loop do menu
const menu = new Menu(); // Instância do menu

// Loop do menu
while (!fim) {
    console.log("Menu:");
    console.log("1 - Listar aerovias");
    console.log("2 - Listar altitudes");
    console.log("3 - Submeter plano de voo");
    console.log("4 - Exibir plano de voo");
    console.log("5 - Listar planos para determinada data");
    console.log("6 - Listar ocupação de aerovia em determinada data");
    console.log("7 - Cancelar plano de voo");
    console.log("8 - Encerrar sistema");
    console.log()
    try {
        // Solicitação da opção ao usuário
        let opcao: number = Number(prompt('Selecione uma opção: '));
        console.log()
        // Realiza a ação de acordo com a opção escolhida
        switch (opcao) {
            case 1:
                const origem: string = prompt('Digite o aeroporto de origem: ');
                const destino: string = prompt('Digite o aeroporto de destino: ');
                console.log()
                menu.listarAerovias(origem, destino);
                break;
            case 2:
                const idAerovia: string = prompt('Digite o ID da aerovia: ');
                const dataAerovia: Date = parseDate(prompt('Digite a data (dd/mm/aaa): '));
                const horarioAerovia: string = prompt('Digite o horario (HH:MM): ');
                console.log()
                menu.listarAltitudesLivres(idAerovia, dataAerovia, horarioAerovia);
                break;
            case 3:
                const idPlanoDeVoo: string = prompt('Digite o ID do plano de voo: ');
                const matricPilotoPlanoDeVoo: string = prompt('Digite matricula do piloto: ');
                const idAeroviaPlanoDeVoo: string = prompt('Digite o ID da aerovia: ');
                const dataPlanoDeVoo: Date = parseDate(prompt('Digite a data do voo (dd/mm/aaa): '));
                const horarioPlanoDeVoo: string = prompt('Digite o horario do voo (HH:MM): ');
                const altitudePlanoDeVoo: number = Number(prompt('Digite a altitude do voo: '));
                console.log()
                menu.aprovarPlanoDeVoo(
                    idPlanoDeVoo,
                    matricPilotoPlanoDeVoo,
                    idAeroviaPlanoDeVoo,
                    dataPlanoDeVoo,
                    horarioPlanoDeVoo,
                    altitudePlanoDeVoo
                )
                break;
            case 4:
                const idPlanoDeVooBusca: string = prompt('Digite o ID do plano de voo: ');
                console.log()
                menu.listarPlano(idPlanoDeVooBusca);
                break;
            case 5:
                const dataPlanosDeVoosBusca: Date = parseDate(prompt('Digite uma data para a buscar os planos de voos: '));
                console.log()
                menu.listarPlanosPorData(dataPlanosDeVoosBusca);
                break;
            case 6:
                const dataOcupacaoAeroviaBusca: Date = parseDate(prompt('Digite uma data para a buscar as aerovias ocupadas: '));
                console.log()
                menu.listarOcupacaoPorData(dataOcupacaoAeroviaBusca);
                break;
            case 7:
                const idPlanoDeVooCancelar: string = prompt('Digite o ID do plano de voo: ');
                console.log()
                menu.cancelarPlano(idPlanoDeVooCancelar);
                break;
            case 8:
                menu.encerrarSistema();
                fim = true; // Encerra o loop
                break;
            default:
                throw new Error("Opção inválida"); // Lança um erro para opções inválidas
        }
    } catch (error: any) {
        console.log(error.message); // Exibe a mensagem de erro
    }
    console.log("");
    console.log("----------------");
}
