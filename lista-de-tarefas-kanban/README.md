# Um sistema Kanban completo! 🎯

## Interface Visual

- Design moderno e responsivo com gradientes e animações
4 colunas bem definidas: "Em Aberto", "Bid (Negociação)", "Em Andamento" e "Entregue"
- Cores diferenciadas para cada coluna conforme o modelo
- Contadores dinâmicos mostrando quantidade de tarefas por coluna

## Interatividade

- Drag & Drop: Arrastar cartões entre colunas com feedback visual
- Adicionar tarefas: Input + botão ou Enter para criar tarefas
- Excluir tarefas: Botão individual em cada cartão com confirmação
- Responsividade: Adaptação automática para mobile e tablet

## Recursos Visuais

- Efeitos hover e animações suaves
- Indicador visual durante arrastar (rotação e opacidade)
- Feedback visual nas colunas durante drop
- Estado vazio para colunas sem tarefas
- Data de criação em cada tarefa

## Persistência de Dados

- Estrutura preparada para localStorage (funciona em ambiente real)
- Manipulação completa do DOM
- Dados organizados em classe JavaScript

## Arquitetura do Código

- Classe KanbanBoard: Organização orientada a objetos
- Métodos específicos: addTask(), deleteTask(), moveTask(), renderTasks()
- Event delegation: Gerenciamento eficiente de eventos
- Separação de responsabilidades: HTML, CSS e JavaScript bem organizados

## Recursos Adicionais:

- Validação de entrada (não permite tarefas vazias)
- Limite de caracteres (200) para descrições
- Feedback ao usuário com alertas
- Tarefas de exemplo para demonstração
- Design adaptativo para diferentes tamanhos de tela

## Autor
Desenvolvido por [Marcos Guimarães Rocha](https://www.linkedin.com/in/marcos-grocha/).