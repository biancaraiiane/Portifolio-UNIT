class KanbanBoard {
  constructor() {
    this.tasks = this.loadTasks();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderTasks();
    this.updateCounters();
  }

  setupEventListeners() {
    const addBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");

    addBtn.addEventListener("click", () => this.addTask());
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTask();
    });

    // Setup drag and drop
    this.setupDragAndDrop();
  }

  addTask() {
    const input = document.getElementById("taskInput");
    const description = input.value.trim();

    if (!description) {
      alert("Por favor, digite uma descrição para a tarefa!");
      return;
    }

    const task = {
      id: Date.now().toString(),
      description: description,
      status: "em-aberto",
      createdAt: new Date().toLocaleString("pt-BR"),
    };

    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
    this.updateCounters();

    input.value = "";
    input.focus();
  }

  deleteTask(taskId) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasks();
      this.renderTasks();
      this.updateCounters();
    }
  }

  moveTask(taskId, newStatus) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
      this.saveTasks();
      this.renderTasks();
      this.updateCounters();
    }
  }

  renderTasks() {
    const containers = {
      "em-aberto": document.getElementById("em-aberto-tasks"),
      negociacao: document.getElementById("negociacao-tasks"),
      "em-andamento": document.getElementById("em-andamento-tasks"),
      entregue: document.getElementById("entregue-tasks"),
    };

    // Clear all containers
    Object.values(containers).forEach((container) => {
      container.innerHTML = "";
    });

    // Render tasks
    this.tasks.forEach((task) => {
      const taskElement = this.createTaskElement(task);
      containers[task.status].appendChild(taskElement);
    });

    // Add empty state for empty columns
    Object.entries(containers).forEach(([status, container]) => {
      if (container.children.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.textContent = "Nenhuma tarefa nesta coluna";
        container.appendChild(emptyState);
      }
    });
  }

  createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.className = `task-card ${task.status}`;
    taskElement.draggable = true;
    taskElement.dataset.taskId = task.id;

    taskElement.innerHTML = `
      <div class="task-content">${task.description}</div>
      <div class="task-actions">
        <div class="task-date">${task.createdAt}</div>
        <button class="delete-btn" onclick="kanban.deleteTask('${task.id}')">
          🗑️ Excluir
        </button>
      </div>
    `;

    return taskElement;
  }

  setupDragAndDrop() {
    const columns = document.querySelectorAll(".kanban-column");

    columns.forEach((column) => {
      column.addEventListener("dragover", (e) => {
        e.preventDefault();
        column.classList.add("drag-over");
      });

      column.addEventListener("dragleave", () => {
        column.classList.remove("drag-over");
      });

      column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.classList.remove("drag-over");

        const taskId = e.dataTransfer.getData("text/plain");
        const newStatus = column.dataset.status;

        this.moveTask(taskId, newStatus);
      });
    });

    // Event delegation for drag events
    document.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("task-card")) {
        e.dataTransfer.setData("text/plain", e.target.dataset.taskId);
        e.target.classList.add("dragging");
      }
    });

    document.addEventListener("dragend", (e) => {
      if (e.target.classList.contains("task-card")) {
        e.target.classList.remove("dragging");
      }
    });
  }

  updateCounters() {
    const counters = {
      "em-aberto": 0,
      negociacao: 0,
      "em-andamento": 0,
      entregue: 0,
    };

    this.tasks.forEach((task) => {
      counters[task.status]++;
    });

    Object.entries(counters).forEach(([status, count]) => {
      const column = document.querySelector(`[data-status="${status}"]`);
      const counter = column.querySelector(".task-counter");
      counter.textContent = count;
    });
  }

  saveTasks() {
    try {
      console.log("Tasks saved to memory:", this.tasks);
    } catch (error) {
      console.warn("Could not save to localStorage:", error);
    }
  }

  loadTasks() {
    try {
      return [];
    } catch (error) {
      console.warn("Could not load from localStorage:", error);
      return [];
    }
  }
}

// Initialize the Kanban board
const kanban = new KanbanBoard();

// Add some sample tasks for demonstration
setTimeout(() => {
  kanban.tasks = [
    {
      id: "1",
      description: "Criar wireframe do projeto",
      status: "em-aberto",
      createdAt: "27/05/2025 10:30:00",
    },
    {
      id: "2",
      description: "Negociar contrato com cliente",
      status: "negociacao",
      createdAt: "27/05/2025 09:15:00",
    },
    {
      id: "3",
      description: "Desenvolver API do sistema",
      status: "em-andamento",
      createdAt: "26/05/2025 14:20:00",
    },
    {
      id: "4",
      description: "Deploy da aplicação em produção",
      status: "entregue",
      createdAt: "25/05/2025 16:45:00",
    },
  ];
  kanban.renderTasks();
  kanban.updateCounters();
}, 100);
