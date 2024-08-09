class ApiError extends Error {
  constructor(sucessCode, message = "something went wrong", errors = []) {
    super(message);
    this.sucessCode = sucessCode;
    this.message = message;
    this.errors = errors;
    this.data = null;
    this.sucess = null;
  }
}
module.exports = ApiError;
