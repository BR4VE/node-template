import ObjectUtils from "helpers/utils/ObjectUtils";
import Scheduler from "scheduler/Scheduler";
import Task from "scheduler/tasks/Task";
import TaskLogModel from "models/TaskLogModel";
import TimeUtils from "helpers/utils/TimeUtils";

class TestTask extends Task {
  async run() {
    this.count = this.count ? this.count + 1 : 1;
  }
}
const Schedulers = [];
const Tasks = {
  run: [],
  stop: [],
};

describe("Scheduler", () => {
  describe("Scheduler.run", () => {
    beforeAll(() => {
      Tasks.run = [
        new TestTask({
          name: "CountTask-1",
          repeatInterval: 500,
        }),
        new TestTask({
          name: "CountTask-2",
          repeatInterval: 500,
        }),
      ];
      const scheduler = new Scheduler([Tasks.run[0]]);

      Schedulers.push(scheduler);
    });

    test("Occupies and runs tasks", async () => {
      const [scheduler] = Schedulers;
      const [task] = Tasks.run;

      await scheduler.run();
      const { intervalId, occupied, running } =
        scheduler.taskSettingsMap[task.name];

      await TimeUtils.sleep(1000);
      const taskLog = await TaskLogModel.findOneBy({ name: task.name });

      expect(intervalId).toBeDefined();
      expect(occupied).toBe(true);
      expect(running).toBe(false);

      expect(taskLog.name).toBe(task.name);
      expect(taskLog.occupied).toBe(true);

      expect(task.count).toBe(2);

      // Clear side effects
      await scheduler.stop();
    });

    test("Different schedulers run sequentially do not occupy same task", async () => {
      const [task] = Tasks.run;
      const [scheduler] = Schedulers;
      const newScheduler = new Scheduler([task]);
      const props = ["intervalId", "occupied", "running"];

      await scheduler.run();
      await newScheduler.run();
      await TimeUtils.sleep(1000);

      const taskLogs = await TaskLogModel.findManyBy({ name: task.name });
      const schedulerProps = ObjectUtils.cloneWithDefinedProps(
        scheduler.taskSettingsMap[task.name],
        props
      );
      const newSchedulerProps = ObjectUtils.cloneWithDefinedProps(
        newScheduler.taskSettingsMap[task.name],
        props
      );

      expect(schedulerProps.intervalId).toBeDefined();
      expect(schedulerProps.occupied).toBe(true);
      expect(schedulerProps.running).toBeDefined();

      expect(newSchedulerProps).toEqual({
        intervalId: null,
        occupied: false,
        running: false,
      });

      expect(taskLogs).toHaveLength(1);

      // clear side effects
      await scheduler.stop();
      await newScheduler.stop();
    });

    test("Different schedulers run parallel do not occupy same task", async () => {
      const [task] = Tasks.run;
      const [scheduler] = Schedulers;
      const newScheduler = new Scheduler([task], "secondScheduler");
      const props = ["intervalId", "occupied", "running"];

      await Promise.all([scheduler.run(), newScheduler.run()]);
      await TimeUtils.sleep(1000);

      const taskLogs = await TaskLogModel.findManyBy({ name: task.name });
      const schedulerProps = ObjectUtils.cloneWithDefinedProps(
        scheduler.taskSettingsMap[task.name],
        props
      );
      const newSchedulerProps = ObjectUtils.cloneWithDefinedProps(
        newScheduler.taskSettingsMap[task.name],
        props
      );

      const [propsDefined, propsNull] = schedulerProps.intervalId
        ? [schedulerProps, newSchedulerProps]
        : [newSchedulerProps, schedulerProps];

      expect(propsDefined.intervalId).toBeDefined();
      expect(propsDefined.occupied).toBe(true);
      expect(propsDefined.running).toBeDefined();

      expect(propsNull).toEqual({
        intervalId: null,
        occupied: false,
        running: false,
      });

      expect(taskLogs).toHaveLength(1);

      // clear side effects
      await scheduler.stop();
      await newScheduler.stop();
    });

    test("Schedulers occupy and run unoccupied tasks", async () => {
      const [scheduler] = Schedulers;
      const newScheduler = new Scheduler(Tasks.run);
      const methodSpy = jest.spyOn(newScheduler, "main");

      // Change mainIntervalSeconds for faster checks
      newScheduler.mainIntervalSeconds = 1000;

      await scheduler.run();
      await newScheduler.run();
      await TimeUtils.sleep(500);

      expect(scheduler.taskSettingsMap[Tasks.run[0].name].occupied).toBe(true);
      expect(newScheduler.taskSettingsMap[Tasks.run[0].name].occupied).toBe(
        false
      );
      expect(newScheduler.taskSettingsMap[Tasks.run[1].name].occupied).toBe(
        true
      );

      await scheduler.stop();
      const taskCountAfterStop = Tasks.run[0].count;
      await TimeUtils.sleep(1200);
      const taskCountAfterOccupy = Tasks.run[0].count;

      expect(methodSpy.mock.calls).toHaveLength(2);
      // Task is run on the newScheduler
      expect(taskCountAfterOccupy - taskCountAfterStop).toBe(1);
      expect(newScheduler.taskSettingsMap[Tasks.run[0].name].occupied).toBe(
        true
      );
      expect(newScheduler.taskSettingsMap[Tasks.run[1].name].occupied).toBe(
        true
      );
      expect(newScheduler.taskSettingsMap[Tasks.run[0].name].occupied).toBe(
        true
      );

      // clear side effects
      await newScheduler.stop();
    });
  });

  describe("Scheduler.stop", () => {
    beforeAll(() => {
      Tasks.stop = [
        new TestTask({
          name: "CountTask-3",
          repeatInterval: 1000 * 3,
        }),
      ];
      const scheduler = new Scheduler([Tasks.stop[0]]);

      Schedulers.push(scheduler);
    });

    test("Clears main interval and release tasks", async () => {
      const [, scheduler] = Schedulers;
      const [task] = Tasks.stop;
      const props = ["mainIntervalId", "taskSettingsMap"];
      const taskLogQuery = { name: task.name };

      await scheduler.run();
      const propsBeforeStop = ObjectUtils.cloneWithDefinedProps(
        scheduler,
        props
      );
      const taskLogBeforeStop = await TaskLogModel.findOneBy(taskLogQuery);
      await scheduler.stop();
      const propsAfterStop = ObjectUtils.cloneWithDefinedProps(
        scheduler,
        props
      );
      const taskLogAfterStop = await TaskLogModel.findOneBy(taskLogQuery);

      expect(propsBeforeStop.mainIntervalId).not.toBe(null);

      expect(taskLogBeforeStop.occupied).toBe(true);

      expect(propsAfterStop.mainIntervalId).toBe(null);
      expect(propsAfterStop.taskSettingsMap[task.name]).toMatchObject({
        intervalId: null,
        occupied: false,
        running: false,
      });

      expect(taskLogAfterStop.occupied).toBe(false);
    });
  });
});
