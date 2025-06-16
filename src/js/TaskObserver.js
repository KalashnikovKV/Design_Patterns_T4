class TaskObserver {
  constructor() {
      this.observers = [];
  }

  subscribe(observer) {
      this.observers.push(observer);
  }

  unsubscribe(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
      this.observers.forEach(observer => observer.update(data));
  }
}

class TaskListObserver {
  constructor(taskListElement) {
      this.taskListElement = taskListElement;
  }

  update(tasks) {
      this.taskListElement.innerHTML = '';
      tasks.forEach((task, idx) => {
          const taskElement = document.createElement('div');
          taskElement.className = `task-item ${task.state.getStateName()}`;
          taskElement.setAttribute('draggable', 'true');
          taskElement.dataset.index = idx;
          const stateName = task.state.getStateName();
          taskElement.innerHTML = `
              <div class="task-content">${task.getDisplayContent()}</div>
              <div class="task-actions">
                  <button class="state-btn" data-id="${task.id}">
                      ${stateName === 'new' ? 'Начать' : 
                        stateName === 'in-progress' ? 'Завершить' : 'Возобновить'}
                  </button>
                  <button class="clone-btn" data-id="${task.id}">Дублировать</button>
                  <button class="deadline-btn" data-id="${task.id}">Дедлайн</button>
                  <button class="delete-btn" data-id="${task.id}">Удалить</button>
              </div>
          `;
          // Drag & drop events
          taskElement.addEventListener('dragstart', (e) => {
              e.dataTransfer.setData('text/plain', idx);
              taskElement.classList.add('dragging');
          });
          taskElement.addEventListener('dragend', () => {
              taskElement.classList.remove('dragging');
          });
          taskElement.addEventListener('dragover', (e) => {
              e.preventDefault();
              taskElement.classList.add('drag-over');
          });
          taskElement.addEventListener('dragleave', () => {
              taskElement.classList.remove('drag-over');
          });
          taskElement.addEventListener('drop', (e) => {
              e.preventDefault();
              taskElement.classList.remove('drag-over');
              const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
              const toIndex = idx;
              if (fromIndex !== toIndex) {
                  const taskManager = TaskManager.getInstance();
                  const command = new MoveTaskCommand(taskManager, fromIndex, toIndex);
                  taskManager.executeCommand(command);
              }
          });
          this.taskListElement.appendChild(taskElement);
      });
  }
}
