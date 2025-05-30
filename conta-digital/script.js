// Estado da aplicação
let appState = {
  balance: 10.0,
  totalIncome: 10.0,
  totalExpense: 0.0,
  transactions: [],
};

// Elementos DOM
const balanceEl = document.getElementById("balance");
const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const transactionsListEl = document.getElementById("transactionsList");

// Modais
const pixModal = document.getElementById("pixModal");
const messageModal = document.getElementById("messageModal");

// Botões
const pixBtn = document.getElementById("pixBtn");
const payBtn = document.getElementById("payBtn");
const investBtn = document.getElementById("investBtn");
const closePixModal = document.getElementById("closePixModal");

// Tabs
const receiveTab = document.getElementById("receiveTab");
const transferTab = document.getElementById("transferTab");
const receiveForm = document.getElementById("receiveForm");
const transferForm = document.getElementById("transferForm");

// Formulários
const receiveSubmit = document.getElementById("receiveSubmit");
const transferSubmit = document.getElementById("transferSubmit");

// Função para formatar valor monetário
function formatCurrency(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

// Função para atualizar display
function updateDisplay() {
  balanceEl.textContent = formatCurrency(appState.balance);
  totalIncomeEl.textContent = formatCurrency(appState.totalIncome);
  totalExpenseEl.textContent = formatCurrency(appState.totalExpense);
  updateTransactionsList();
}

// Função para mostrar mensagem
function showMessage(title, text) {
  document.getElementById("messageTitle").textContent = title;
  document.getElementById("messageText").textContent = text;
  messageModal.classList.add("show");
}

// Função para gerar ID de transação
function generateTransactionId() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const min = now.getMinutes().toString().padStart(2, "0");
  const sec = now.getSeconds().toString().padStart(2, "0");

  return year + month + day + hour + min + sec;
}

// Função para formatar data/hora
function formatDateTime() {
  const now = new Date();
  return now.toLocaleString("pt-BR");
}

// Função para adicionar transação
function addTransaction(type, amount, description) {
  const transaction = {
    id: generateTransactionId(),
    type: type,
    amount: amount,
    description: description,
    datetime: formatDateTime(),
    icon: type === "income" ? "↓" : "↑",
  };

  appState.transactions.unshift(transaction);
  updateDisplay();
}

// Função para atualizar lista de transações
function updateTransactionsList() {
  if (appState.transactions.length === 0) {
    transactionsListEl.innerHTML =
      '<div class="no-transactions">Não constam transações</div>';
    return;
  }

  transactionsListEl.innerHTML = appState.transactions
    .map(
      (transaction) => `
        <div class="transaction-item">
            <div class="transaction-icon ${transaction.type}">
                ${transaction.icon}
            </div>
            <div class="transaction-details">
                <div class="transaction-type">${transaction.description}</div>
                <div class="transaction-info">
                    ${transaction.datetime} | ID: ${transaction.id}
                </div>
            </div>
            <div class="transaction-amount ${transaction.type}">
                ${transaction.type === "income" ? "+" : "-"}${formatCurrency(
        Math.abs(transaction.amount)
      )}
            </div>
        </div>
    `
    )
    .join("");
}

// Event Listeners
pixBtn.addEventListener("click", () => {
  pixModal.classList.add("show");
});

payBtn.addEventListener("click", () => {
  showMessage("Sistema Indisponível", "Tente novamente mais tarde.");
});

investBtn.addEventListener("click", () => {
  showMessage("Sistema Indisponível", "Tente novamente mais tarde.");
});

closePixModal.addEventListener("click", () => {
  pixModal.classList.remove("show");
  clearForms();
});

// Tabs PIX
receiveTab.addEventListener("click", () => {
  receiveTab.classList.add("active");
  transferTab.classList.remove("active");
  receiveForm.style.display = "block";
  transferForm.style.display = "none";
  clearForms();
});

transferTab.addEventListener("click", () => {
  transferTab.classList.add("active");
  receiveTab.classList.remove("active");
  transferForm.style.display = "block";
  receiveForm.style.display = "none";
  clearForms();
});

// Função para limpar formulários
function clearForms() {
  document.getElementById("receiveCpfCnpj").value = "";
  document.getElementById("receiveAmount").value = "";
  document.getElementById("transferPixKey").value = "";
  document.getElementById("transferAmount").value = "";
  document.getElementById("receiveMessage").innerHTML = "";
  document.getElementById("transferMessage").innerHTML = "";
}

// Formulário RECEBER
receiveSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const cpfCnpj = document.getElementById("receiveCpfCnpj").value.trim();
  const amount = parseFloat(document.getElementById("receiveAmount").value);
  const messageEl = document.getElementById("receiveMessage");

  if (!cpfCnpj || !amount || amount <= 0) {
    messageEl.innerHTML =
      '<div class="error-message">Todos os campos devem ser preenchidos!</div>';
    return;
  }

  // Processar recebimento
  appState.balance += amount;
  appState.totalIncome += amount;

  addTransaction("income", amount, "Transferência recebida");

  messageEl.innerHTML =
    '<div class="success-message">Transação realizada com sucesso!</div>';

  setTimeout(() => {
    pixModal.classList.remove("show");
    clearForms();
  }, 2000);
});

// Formulário TRANSFERIR
transferSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const pixKey = document.getElementById("transferPixKey").value.trim();
  const amount = parseFloat(document.getElementById("transferAmount").value);
  const messageEl = document.getElementById("transferMessage");

  if (!pixKey || !amount || amount <= 0) {
    messageEl.innerHTML =
      '<div class="error-message">Todos os campos devem ser preenchidos!</div>';
    return;
  }

  if (amount > appState.balance) {
    messageEl.innerHTML =
      '<div class="error-message">Saldo insuficiente!</div>';
    return;
  }

  // Processar transferência
  appState.balance -= amount;
  appState.totalExpense += amount;

  addTransaction("expense", -amount, "Transferência enviada");

  messageEl.innerHTML =
    '<div class="success-message">Transação realizada com sucesso!</div>';

  setTimeout(() => {
    pixModal.classList.remove("show");
    clearForms();
  }, 2000);
});

// Fechar modal de mensagem
document.getElementById("messageOk").addEventListener("click", () => {
  messageModal.classList.remove("show");
});

// Fechar modais clicando fora
pixModal.addEventListener("click", (e) => {
  if (e.target === pixModal) {
    pixModal.classList.remove("show");
    clearForms();
  }
});

messageModal.addEventListener("click", (e) => {
  if (e.target === messageModal) {
    messageModal.classList.remove("show");
  }
});

// Inicializar aplicação
updateDisplay();
