class TaskFactory {
    static createTask(content, type = 'default') {
        switch (type) {
            case 'urgent':
                return new UrgentTask(content);
            case 'important':
                return new ImportantTask(content);
            default:
                return new Task(content);
        }
    }
}

class UrgentTask extends Task {
    constructor(content) {
        super(content);
        this.priority = 'urgent';
    }
}

class ImportantTask extends Task {
    constructor(content) {
        super(content);
        this.priority = 'important';
    }
}
