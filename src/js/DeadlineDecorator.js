class DeadlineDecorator {
    constructor(task, deadline) {
        this.task = task;
        this.deadline = deadline;
        this.id = task.id;
    }
    getDisplayContent() {
        return this.task.getDisplayContent() + ` <span style='color:#e67e22'>(до ${this.deadline})</span>`;
    }
    get state() { return this.task.state; }
    set state(val) { this.task.state = val; }
    nextState() { this.task.nextState(); }
    setState(state) { this.task.setState(state); }
    clone() { return new DeadlineDecorator(this.task.clone(), this.deadline); }
    get priority() { return this.task.priority; }
    set priority(val) { this.task.priority = val; }
}