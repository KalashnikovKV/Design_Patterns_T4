class TaskState {
    constructor(task) {
        this.task = task;
    }

    next() {
        throw new Error('Method next() must be implemented');
    }

    getStateName() {
        throw new Error('Method getStateName() must be implemented');
    }
}

class NewTaskState extends TaskState {
    next() {
        this.task.setState(new InProgressTaskState(this.task));
    }

    getStateName() {
        return 'new';
    }
}

class InProgressTaskState extends TaskState {
    next() {
        this.task.setState(new CompletedTaskState(this.task));
    }

    getStateName() {
        return 'in-progress';
    }
}

class CompletedTaskState extends TaskState {
    next() {
        this.task.setState(new NewTaskState(this.task));
    }

    getStateName() {
        return 'completed';
    }
}
