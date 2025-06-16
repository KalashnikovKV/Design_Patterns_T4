// SINGLETON
class TaskManager {
    constructor() {
        if (TaskManager.instance) {
            return TaskManager.instance;
        }
        TaskManager.instance = this;
        
        this.tasks = [];
        this.observer = new TaskObserver();
        this.commandHistory = [];
        this.currentFilter = 'all';
        
        this.initializeEventListeners();
    }

    static getInstance() {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    initializeEventListeners() {
        const addButton = document.getElementById('addTask');
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const taskType = document.getElementById('taskType');
        const undoBtn = document.getElementById('undoBtn');

        addButton.addEventListener('click', () => {
            const content = taskInput.value.trim();
            const type = taskType.value;
            if (content) {
                const command = new AddTaskCommand(this, content, type);
                this.executeCommand(command);
                taskInput.value = '';
                taskType.value = 'default';
            } else {
                this.showError('Нельзя добавить пустую задачу!');
            }
        });

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addButton.click();
            }
        });

        taskList.addEventListener('click', (e) => {
            const taskId = e.target.dataset.id;
            if (!taskId) return;

            if (e.target.classList.contains('delete-btn')) {
                const command = new DeleteTaskCommand(this, taskId);
                this.executeCommand(command);
            } else if (e.target.classList.contains('state-btn')) {
                const command = new ChangeTaskStateCommand(this, taskId);
                this.executeCommand(command);
            } else if (e.target.classList.contains('clone-btn')) {
                const task = this.getTask(taskId);
                if (task) {
                    const clone = task.clone();
                    this.addTask(clone);
                    this.notifyObservers();
                }
            } else if (e.target.classList.contains('deadline-btn')) {
                let task = this.getTask(taskId);
                if (task) {
                    const deadline = prompt('Введите дедлайн (например, 2024-06-20):');
                    if (deadline) {
                        // Оборачиваем задачу в декоратор
                        const decorated = new DeadlineDecorator(task, deadline);
                        // Заменяем задачу в массиве
                        const idx = this.tasks.findIndex(t => t.id === taskId);
                        if (idx !== -1) {
                            this.tasks[idx] = decorated;
                            this.notifyObservers();
                        }
                    }
                }
            }
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentFilter = button.dataset.filter;
                this.notifyObservers();
            });
        });

        undoBtn.addEventListener('click', () => {
            this.undo();
        });
    }

    executeCommand(command) {
        try {
            command.execute();
            this.commandHistory.push(command);
            this.notifyObservers();
        } catch (e) {
            this.showError(e.message);
            console.error(e);
        }
    }

    showError(message) {
        let errorBlock = document.getElementById('errorBlock');
        if (!errorBlock) {
            errorBlock = document.createElement('div');
            errorBlock.id = 'errorBlock';
            errorBlock.style.background = '#ffe0e0';
            errorBlock.style.color = '#a94442';
            errorBlock.style.padding = '10px';
            errorBlock.style.margin = '10px 0';
            errorBlock.style.border = '1px solid #a94442';
            errorBlock.style.borderRadius = '4px';
            errorBlock.style.textAlign = 'center';
            document.querySelector('.container').prepend(errorBlock);
        }
        errorBlock.textContent = 'Ошибка: ' + message;
        setTimeout(() => {
            if (errorBlock) errorBlock.remove();
        }, 4000);
    }

    undo() {
        const command = this.commandHistory.pop();
        if (command) {
            command.undo();
            this.notifyObservers();
        }
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    getTask(taskId) {
        return this.tasks.find(task => task.id === taskId);
    }

    getFilteredTasks() {
        if (this.currentFilter === 'all') {
            return this.tasks;
        }
        return this.tasks.filter(task => task.state.getStateName() === this.currentFilter);
    }

    subscribe(observer) {
        this.observer.subscribe(observer);
    }

    notifyObservers() {
        this.observer.notify(this.getFilteredTasks());
    }

    moveTask(fromIndex, toIndex) {
        if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= this.tasks.length || toIndex >= this.tasks.length) return;
        const [task] = this.tasks.splice(fromIndex, 1);
        this.tasks.splice(toIndex, 0, task);
        this.notifyObservers();
    }
}
// SINGLETON

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = TaskManager.getInstance();
    const taskListObserver = new TaskListObserver(document.getElementById('taskList'));
    taskManager.subscribe(taskListObserver);
});
