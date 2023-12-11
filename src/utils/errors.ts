export class ResponseError extends Error {
  status: number;
  constructor(msg: string, status?: number) {
    super();
    this.name = 'ResponseError';
    this.status = status || 400;
    this.message = msg;
  }
}
