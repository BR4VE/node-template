class Task {
  constructor({ name, repeatInterval }) {
    this.name = name;
    this.repeatInterval = repeatInterval;
  }

  // eslint-disable-next-line class-methods-use-this
  async run() {
    throw new Error("Task is an abstract class, you need to implement this");
  }
}

export default Task;
