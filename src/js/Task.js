class Task {
    constructor(content) {
        this.id = Date.now().toString();
        this.content = content;
        this.state = new NewTaskState(this);
        this.createdAt = new Date();
    }

    setState(state) {
        this.state = state;
    }

    nextState() {
        this.state.next();
    }

    // PROTOTYPE
    clone() {
        const copy = new this.constructor(this.content);
        copy.state = new this.state.constructor(copy);
        copy.priority = this.priority;
        return copy;
    }
    // PROTOTYPE

    getDisplayContent() {
        let content = this.content;
        if (this.priority === 'urgent') content = `[срочно] ${content}`;
        if (this.priority === 'important') content = `[важно] ${content}`;
        return content;
    }
}
