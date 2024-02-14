export class ResourceNotFoundError extends Error implements UseCaseError {
  public reason: string;

  constructor(reason: string) {
    super("resource not found");
    this.reason = reason;
  }
}
