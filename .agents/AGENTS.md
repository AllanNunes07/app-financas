# Diretrizes do Agente - FinPurple

## Idioma de Comunicação
- O agente deve se comunicar e responder ao usuário sempre em **Português (pt-BR)**.

## Histórico do Projeto e Alterações Realizadas (Julho de 2026)
- **Edição de Lançamentos**: Adicionada a capacidade de editar transações diretamente pelo modal `#transaction-modal` reutilizando o formulário. O ID do item editado é mantido no input `#edit-tx-id`. O título do modal é alterado dinamicamente para "Editar Lançamento" e limpo no fechamento.
- **Integração do Cofrinho (Saldo Disponível)**:
  - O card de saldo no dashboard passou a exibir o **Saldo Disponível** (`Saldo Geral - Poupado nas Metas`).
  - O rodapé do card de saldo (`#balance-footer-text`) exibe detalhadamente: `Total: R$ [Saldo Geral] | Poupado: R$ [Total Guardado]`.
  - Adicionada validação de limite no depósito das metas, impedindo depósitos maiores que o saldo disponível com a mensagem *"Saldo disponível insuficiente para guardar este valor."* via Toast Alert.
- **Edição de Metas de Poupança (Cofrinho)**:
  - Adicionado o botão "Editar" (`.btn-goal-act.edit`) na lista de metas.
  - O modal de metas abre preenchendo o nome e o limite atual da meta quando acionado na ação `'edit'`.
  - O envio atualiza as informações da meta no `localStorage`.

## Histórico do Projeto e Alterações Realizadas (Setembro de 2026)
- **Visual dos Cartões de Crédito**:
  - Removido o efeito degradê (`linear-gradient`) dos cartões, adotando cores sólidas oficiais: Roxo Nubank (`#820ad1`), Laranja Inter (`#ff7a00`), Azul (`#1e40af`), Verde (`#059669`) e Preto (`#18181b`).
  - Removida a exibição do número do cartão (`•••• •••• •••• xxxx`) do corpo do cartão, mantendo apenas as tags de status e dados da fatura para visual limpo e moderno.
  - O campo de últimos 4 dígitos no modal de criação/edição de cartão foi tornado opcional.
  - Ajustado o contraste e a tipografia das informações do cartão e botões de ação rápida para legibilidade perfeita sobre fundos sólidos.
  - **Ícone da Bandeira e Nome do Banco**: Atualizado o cabeçalho do cartão para exibir o ícone visual oficial da bandeira (ex: logotipo oficial da Mastercard com os círculos vermelho e amarelo sobrepostos) alinhado ao nome do banco ("Nubank", "Inter", etc.). Removido o nome da bandeira em texto e adicionado botão de menu kebab (`⋮`) para opções rápidas.
- **Navegação pelos Cards do Dashboard & Nova Tela de Transações (Estilo Mobills)**:
  - Os cards de métricas no topo do Dashboard tornaram-se interativos e clicáveis:
    - Ao clicar em **"Saldo atual >"**, o app navega para a aba de contas em *Contas & Cartões*.
    - Ao clicar em **"Receitas >"**, navega para a tela de *Transações* com o filtro de receitas ativado (`Receitas`).
    - Ao clicar em **"Despesas >"**, navega para a tela de *Transações* com o filtro de despesas ativado (`Despesas`).
    - Ao clicar em **"Cartão de crédito >"**, navega para a aba de cartões em *Contas & Cartões*.
  - A tela de **Transações** foi reformulada com o layout completo inspirado no Mobills:
    - **Pílula de Filtro com Dropdown Dinâmico** (`⌵ Receitas`, `⌵ Despesas`, `⌵ Todas as Transações`, etc.).
    - **Botão de Ação Dinâmica** (`+ NOVA RECEITA` / `+ NOVA DESPESA` / `+ NOVO LANÇAMENTO`) que já abre o modal com o tipo pré-selecionado correspondente.
    - **3 Cards de Resumo no Topo da Página de Transações** com cálculos dinâmicos de valores pendentes, realizados/pagos e total do período.
    - **Barra de Navegação de Mês** (`< Setembro 2026 >`) sincronizada com o seletor do cabeçalho e popover modal.
- **Estilização dos Botões de Ação dos Widgets do Dashboard**:
  - Os botões de alternância de faturas (`Abertas` | `Fechadas`) foram estilizados no padrão fintech pílula com fundo suave, tipografia moderna e destaque ativo roxo com gradiente e sombra suave.
  - O botão de ação rápida (`+ Novo Cartão` e `+ Nova Conta`) foi padronizado em formato pílula com efeito hover animado, mantendo a harmonia visual com o restante da aplicação.



