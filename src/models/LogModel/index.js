import BaseModel from "models/BaseModel";
import LogSchema from "models/LogModel/LogSchema";

class LogModel extends BaseModel {}

export default new LogModel({
  schema: LogSchema,
});
