class ResponseHandler {
  static async safeCreate(callback) {
    try {
      const result = await callback();
      return result;
    } catch (error) {
      if (error.code === 11000) {
        return null;
      }

      throw error;
    }
  }

  static async safeUpsert(callback) {
    try {
      const result = await callback();
      return result;
    } catch (error) {
      if (error?.code === 11000) {
        const result = await callback();
        return result;
      }

      throw error;
    }
  }
}

export default ResponseHandler;
