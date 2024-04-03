# @Sistema de Aviação

## Descrição
O Sistema de Aviação é uma aplicação de linha de comando projetada para auxiliar pilotos no planejamento e aprovação de seus planos de voo. Com uma interface intuitiva e funcionalidades abrangentes, este sistema simplifica o processo de planejamento de voo, permitindo aos pilotos acessar informações essenciais e submeter planos de voo com facilidade.

---

## Funcionalidades

**1 - Listar Aerovias:** Esta funcionalidade permite listar todas as aerovias disponíveis entre dois aeroportos específicos. Além disso, é possível visualizar detalhes sobre as aerovias, como origem e destino.

**2 - Listar Altitudes Disponíveis:** Permite verificar as altitudes livres em uma determinada aerovia em um horário específico, facilitando o planejamento do voo.

**3 - Submeter Plano de Voo:** Os pilotos podem submeter seus planos de voo completos através deste sistema. O sistema realiza uma análise completa dos dados submetidos, verificando a consistência das informações, a disponibilidade da aerovia e altitude nos horários solicitados, além de respeitar todas as restrições aplicáveis à aeronave. Em caso de aprovação, um identificador numérico é atribuído ao plano de voo, armazenado no sistema e marcando a respectiva aerovia/altitude como ocupada nos horários indicados.

**4 - Listar Plano de Voo por ID:** Permite visualizar informações detalhadas de um plano de voo específico, utilizando seu identificador único.

**5 - Listar Planos por Data:** Esta funcionalidade possibilita listar todos os planos de voo previstos para uma determinada data, exibindo seus identificadores, origem e destino.

**6 - Listar Ocupação de Aerovia por Data:** Permite listar a ocupação de uma aerovia em uma data específica, exibindo os identificadores, origem e destino dos planos aprovados.

**7 - Cancelar Plano de Voo:** Os pilotos têm a opção de cancelar um plano de voo previamente submetido. Ao cancelar um plano, a aerovia e altitude correspondentes são liberadas nos horários previamente bloqueados.

**8 - Encerrar Sistema:** Encerra o sistema e salva todos os dados em arquivos, garantindo a persistência das informações para futuras utilizações.

---

## Linguagem Utilizada
 
**- TypeScript**

---

## Instalação
Para instalar o Sistema de Aviação, siga estes passos:

1 - Clone ou baixe o repositório para sua máquina local.
2 - Navegue até o diretório do projeto em seu terminal.
3 - Execute o comando **`npm install`** para instalar as dependências necessárias.

---

## Uso
### Para usar o Sistema de Aviação, siga estes passos:

1 - Certifique-se de que as dependências estejam instaladas executando **`npm install`**.
2 - Inicie a aplicação executando **`npm run start`**.
3 - Siga as instruções exibidas no terminal para navegar pelo menu e realizar as operações desejadas.

---

## Dependências
### O Sistema de Aviação depende das seguintes bibliotecas:

**- date-fns:** Uma biblioteca para manipulação de datas em JavaScript.
**- n-readlines:** Uma biblioteca para ler linhas de arquivos no Node.js.
**- prompt-sync:** Um prompt síncrono para interfaces de linha de comando.
**- zod:** Uma biblioteca de declaração e validação de esquema TypeScript-first.

---

## Scripts
**- start:** Executa o código TypeScript diretamente usando tsx.
**- build:** Compila o código TypeScript para JavaScript.
**- start:node:** Inicia a aplicação após compilar o TypeScript para JavaScript.

---

## Licença
Este projeto está licenciado sob a Licença ISC.

---

## Autor
**George Lucas**