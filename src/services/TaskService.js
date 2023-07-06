import DateUtils from "helpers/utils/DateUtils";
import ResponseHandler from "helpers/ResponseHandler";
import TaskLogModel from "models/TaskLogModel";

const OneMinute = 1000 * 60;

class TaskService {
  static async occupyTask({ name, repeatInterval }) {
    const canOccupy = await TaskService._canOccupyTask({
      name,
      repeatInterval,
    });

    if (!canOccupy) {
      return null;
    }

    // Try to create two taskLog too see if we got a unique error from server
    const flooredDate = DateUtils.floorToFlatMinutes(new Date());
    const flooredPastDate = new Date(flooredDate.getTime() - OneMinute);
    const data = { name, occupied: true };
    const taskLogs = await Promise.all([
      ResponseHandler.safeCreate(async () =>
        TaskLogModel.create({ ...data, lastExecution: flooredPastDate })
      ),
      ResponseHandler.safeCreate(async () =>
        TaskLogModel.create({ ...data, lastExecution: flooredDate })
      ),
    ]);

    const [pastLog, currentLog] = taskLogs;
    const allCreated = pastLog && currentLog;

    // Task is not occupied by another service
    if (allCreated) {
      // Delete all logs
      await TaskLogModel.deleteManyBy({ _id: { $ne: currentLog._id }, name });
      return currentLog;
    }

    // Task is occupied by another service
    await TaskLogModel.deleteManyBy({ _id: [pastLog?._id, currentLog?._id] });
    return null;
  }

  static async _canOccupyTask({ name, repeatInterval }) {
    const taskLog = (await TaskLogModel.findMostRecentOneBy({ name })) ?? {};
    const now = new Date();
    const lastExecution = taskLog.lastExecution?.getTime?.() ?? 0;
    const timeSinceLastExecution = now.getTime() - lastExecution;

    const canOccupy = !taskLog.occupied
      ? true
      : timeSinceLastExecution >= 2 * repeatInterval;

    return canOccupy;
  }
}

export default TaskService;
