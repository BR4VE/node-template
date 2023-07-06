import BaseModel from "models/BaseModel";
import TaskLogSchema from "models/TaskLogModel/TaskLogSchema";

class TaskLogModel extends BaseModel {
  async findAvailableTasks(taskNames = []) {
    return this.findManyBy({
      name: { $in: taskNames },
    });
  }
}

export default new TaskLogModel({
  schema: TaskLogSchema,
});
