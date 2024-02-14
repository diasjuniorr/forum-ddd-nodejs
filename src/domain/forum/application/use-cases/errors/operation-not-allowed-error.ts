export class OperationNotAllowedError extends Error implements UseCaseError {
  public reason: string;

  constructor(reason: string) {
    super("not allowed");
    this.reason = reason;
  }
}
