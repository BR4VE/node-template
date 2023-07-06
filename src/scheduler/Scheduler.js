import ArrayUtils from "helpers/utils/ArrayUtils";
import Environment from "infra/Environment";
import LoggerService from "services/LoggerService";
import TaskLogModel from "models/TaskLogModel";
import TaskService from "services/TaskService";

import async from "async";

const TenSeconds = 1000 * 10;

const logToConsole = (message) => {
  if (!Environment.isProduction()) {
    return;
  }

  LoggerService.logToConsole(message);
};

class Scheduler {
  constructor(tasks) {
    this.mainIntervalSeconds = TenSeconds;
    this.mainIntervalId = null;
    this.taskSettingsMap = {};
    tasks.forEach((task) => {
      this.taskSettingsMap[task.name] = {
        intervalId: null,
        task,
        occupied: false,
        running: false,
      };
    });
  }

  async main() {
    const unoccupiedTasks = this._getUnoccupiedTasks();
    const taskNames = ArrayUtils.getKeys(unoccupiedTasks, "name");
    logToConsole(
      `[Scheduler] Found locally unoccupied tasks: ${taskNames.join(",")}`
    );
    await async.each(unoccupiedTasks, async (task) => this._occupyTask(task));
    const occupiedTasks = this._getOccupiedTasks();
    const occupiedTaskNames = ArrayUtils.getKeys(occupiedTasks, "name");
    logToConsole(`[Scheduler] Occupied tasks: ${occupiedTaskNames.join(",")}`);
    await this._scheduleAndRunOccupiedTasks();
  }

  async stop() {
    clearInterval(this.mainIntervalId);
    this.mainIntervalId = null;

    const tasks = this._getOccupiedTasks();
    const taskNames = ArrayUtils.getKeys(tasks, "name");
    logToConsole(
      `[Scheduler] Releasing occupied tasks: ${taskNames.join(",")}`
    );

    await async.each(tasks, async (task) => this._releaseTask(task));
  }

  async run() {
    // Run main for initial execution
    await this.main();
    this.mainIntervalId = setInterval(
      () => this.main(),
      this.mainIntervalSeconds
    );
  }

  _getOccupiedTasks() {
    return Object.values(this.taskSettingsMap)
      .filter((taskSettings) => taskSettings.occupied)
      .map(({ task }) => task);
  }

  _getUnoccupiedTasks() {
    return Object.values(this.taskSettingsMap)
      .filter((taskSettings) => !taskSettings.occupied)
      .map(({ task }) => task);
  }

  async _occupyTask(task) {
    const createdTaskLog = await TaskService.occupyTask(task);
    // Task is occupied by another scheduler
    if (!createdTaskLog) {
      return;
    }

    this._updateTaskSettingsMap(task.name, { occupied: true });
  }

  async _releaseTask(task) {
    const { intervalId } = this.taskSettingsMap[task.name];
    clearInterval(intervalId);
    await TaskLogModel.updateOneBy({ name: task.name }, { occupied: false });
    this._updateTaskSettingsMap(task.name, {
      intervalId: null,
      occupied: false,
      running: false,
    });
  }

  async _updateTaskSettingsMap(key, value = {}) {
    this.taskSettingsMap[key] = { ...this.taskSettingsMap[key], ...value };
  }

  async _scheduleAndRunOccupiedTasks() {
    const occupiedTasks = this._getOccupiedTasks();
    const occupiedTaskNames = ArrayUtils.getKeys(occupiedTasks, "name");

    occupiedTaskNames.forEach((taskName) => {
      const {
        intervalId: taskIntervalId,
        task: { repeatInterval },
      } = this.taskSettingsMap[taskName];

      if (taskIntervalId) {
        return;
      }

      const intervalId = setInterval(async () => {
        const { task, running } = this.taskSettingsMap[taskName];
        const query = [{ name: task.name }, { lastExecution: new Date() }];

        if (running) {
          await TaskLogModel.updateOneBy(...query);
          return;
        }

        this._updateTaskSettingsMap(task.name, { running: true });
        logToConsole(`[Scheduler] ${task.name}: Started`);
        await task.run();

        this._updateTaskSettingsMap(task.name, { running: false });
        logToConsole(`[Scheduler] ${task.name}: Finished`);
        await TaskLogModel.updateOneBy(...query);
      }, repeatInterval);

      this._updateTaskSettingsMap(taskName, { intervalId });
    });
  }
}

export default Scheduler;
