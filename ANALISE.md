# DevOpsAtividade6 – Pipeline com GitHub Actions e análise de repositórios

## 1. Pipeline integrada ao projeto

Foi criada uma pipeline com GitHub Actions no arquivo de workflow dentro de `.github/workflows`. Ela é executada automaticamente a cada novo push na branch principal (`main`).

O projeto é uma aplicação Node.js. A pipeline realiza as seguintes etapas: checkout do código, configuração do Node.js, instalação das dependências com npm e execução dos testes do projeto.

Evidência: a aba Actions do repositório registra as execuções do workflow "Pipeline" na branch main, todas concluídas com sucesso. A execução #1 foi disparada pelo commit d182fd1, e as execuções #2 e #3 foram disparadas por novos commits (criação e atualização do ANALISE.md), o que comprova que a pipeline roda a cada novo push na main.

## 2. Análise de repositórios com pipeline

Foram analisados três repositórios públicos do GitHub que usam GitHub Actions com projetos Java/Maven.

### 2.1 wiremock/wiremock-testcontainers-java
Link: https://github.com/wiremock/wiremock-testcontainers-java

**Características**
- Módulo do Testcontainers para Java que permite subir o servidor WireMock como contêiner dentro de testes.
- Projeto Maven em Java, licença Apache 2.0, mantido pela organização WireMock.
- Publicado no Maven Central e no GitHub Packages, e também disponível via JitPack.

**Funcionalidades da pipeline**
- Workflow chamado "CI", com cerca de 35 linhas.
- Matriz de versões do Java (8, 11 e 17), rodando o build em cada uma.
- Opção fail-fast desativada: se uma versão falhar, as outras continuam e todos os resultados ficam visíveis.
- Cache de dependências do Maven.
- Build com o comando mvn -B package.

**Gatilhos**
- Push na branch main.
- Pull request para a main.

**Histórico**
- Repositório criado em 15 de abril de 2023.
- Em levantamento de março de 2025: 246 commits na branch principal, 9 releases (a mais recente, 1.0-alpha-14, de agosto de 2024), 56 estrelas e 11 forks.
- O histórico completo do arquivo da pipeline pode ser visto em .github/workflows/ci.yml, no botão History.

### 2.2 Rohithv07/OnlineShopping
Link: https://github.com/Rohithv07/OnlineShopping

**Características**
- Loja online em arquitetura de microsserviços, com dois serviços (OrderService e ProductService) no mesmo repositório (monorepo).
- Usado como exemplo em um artigo da comunidade DEV sobre automação de builds Java com GitHub Actions.

**Funcionalidades da pipeline**
- Um único arquivo ci.yml, chamado "Java CI with Maven".
- JDK 17 (Temurin) com cache do Maven.
- Build e testes de cada serviço no seu próprio diretório (working-directory), evitando que uma mudança em um serviço quebre o outro sem ser percebida.

**Gatilhos**
- Push na main.
- Pull request para a main.
- Execução manual (workflow_dispatch).

**Histórico**
- O artigo descreve a adoção do processo: criar a pasta .github/workflows, adicionar o ci.yml, fazer commit e push e acompanhar o resultado na aba Actions.
- Não foi encontrado registro detalhado das mudanças do arquivo. O histórico pode ser consultado no botão History do arquivo no GitHub.

### 2.3 redhat-actions/buildah-build
Link: https://github.com/redhat-actions/buildah-build

**Características**
- Action mantida pela Red Hat para construir imagens de contêiner com Buildah.
- A própria pipeline do projeto testa a Action construindo uma imagem do projeto de exemplo spring-petclinic.

**Funcionalidades da pipeline**
- Workflow "Multiarch build", com cerca de 229 linhas, o mais completo dos três.
- Faz checkout da Action e do projeto de exemplo, configura Java 17 com cache Maven, compila com mvn package e constrói uma imagem multiarquitetura.
- Matriz que testa com e sem a versão mais recente do Buildah, com fail-fast desativado.
- Instala o qemu para emular outras arquiteturas e exibe a imagem gerada ao final.

**Gatilhos**
- Push e pull request.
- Execução manual (workflow_dispatch).
- Execução agendada (cron) todos os dias à meia-noite, para detectar quebras causadas por mudanças externas mesmo sem commits novos.

**Histórico**
- Versões antigas usavam actions/checkout@v2 e actions/cache@v2, com cache do Maven montado manualmente a partir de um hash do pom.xml.
- Versões novas migraram para actions/checkout@v4 e setup-java com cache: maven, simplificando o arquivo.
- Um commit atualizou os workflows para as versões mais recentes das Actions e das dependências, passando a rodar em Node 20.
- Também foi adicionado um teste de build multiarquitetura a partir do zero.

## 3. Comparativo

| Critério | wiremock-testcontainers-java | OnlineShopping | buildah-build |
|---|---|---|---|
| Tipo de projeto | Biblioteca de testes | Microsserviços (monorepo) | Action de contêineres |
| Gatilhos | push, PR | push, PR, manual | push, PR, manual, agendado |
| Matriz de execução | JDK 8, 11 e 17 | Não | Com e sem Buildah mais recente |
| Cache de dependências | Sim | Sim | Sim |
| Gera imagem de contêiner | Não | Não | Sim (multiarquitetura) |
| Complexidade | Baixa | Média | Alta |

## 4. Conclusão

Os três repositórios seguem a mesma base: o workflow fica em .github/workflows, usa o gatilho de push na main, configura o Java e usa cache do Maven. O que muda é a sofisticação: o primeiro adiciona uma matriz de versões do Java, o segundo trata vários serviços em um só repositório e o terceiro inclui execução agendada e geração de imagens de contêiner.

A pipeline do DevOpsAtividade6 segue essa base e atende ao pedido: executa automaticamente a cada push na main.
