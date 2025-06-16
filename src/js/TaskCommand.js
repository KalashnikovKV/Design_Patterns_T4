class TaskCommand {
    execute() {
        throw new Error('Method execute() must be implemented');
    }

    undo() {
        throw new Error('Method undo() must be implemented');
    }
}

class AddTaskCommand extends TaskCommand {
    constructor(taskManager, content, type = 'default') {
        super();
        this.taskManager = taskManager;
        this.content = content;
        this.type = type;
        this.task = null;
    }

    execute() {
        this.task = TaskFactory.createTask(this.content, this.type);
        this.taskManager.addTask(this.task);
    }

    undo() {
        if (this.task) {
            this.taskManager.removeTask(this.task.id);
        }
    }
}

class DeleteTaskCommand extends TaskCommand {
    constructor(taskManager, taskId) {
        super();
        this.taskManager = taskManager;
        this.taskId = taskId;
        this.task = null;
    }

    execute() {
        this.task = this.taskManager.getTask(this.taskId);
        this.taskManager.removeTask(this.taskId);
    }

    undo() {
        if (this.task) {
            this.taskManager.addTask(this.task);
        }
    }
}

class ChangeTaskStateCommand extends TaskCommand {
    constructor(taskManager, taskId) {
        super();
        this.taskManager = taskManager;
        this.taskId = taskId;
        this.previousState = null;
    }

    execute() {
        const task = this.taskManager.getTask(this.taskId);
        if (task) {
            this.previousState = task.state;
            task.nextState();
        }
    }

    undo() {
        const task = this.taskManager.getTask(this.taskId);
        if (task && this.previousState) {
            task.setState(this.previousState);
        }
    }
}

class MoveTaskCommand extends TaskCommand {
    constructor(taskManager, fromIndex, toIndex) {
        super();
        this.taskManager = taskManager;
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
    }

    execute() {
        this.taskManager.moveTask(this.fromIndex, this.toIndex);
    }

    undo() {
        this.taskManager.moveTask(this.toIndex, this.fromIndex);
    }
}
