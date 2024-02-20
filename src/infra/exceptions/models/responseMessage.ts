export class ResponseMessage {
  statusCode: number;
  timestamp: string;
  path: any;
  message: string;
  constructor(statusCode: number, timestamp: string, path: any, message: string) {
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.path = path;
    this.message = message;
  }
}