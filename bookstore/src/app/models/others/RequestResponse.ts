export interface RequestResponse<T> {
  successResult: T;
  errors: any[];
  isError: boolean;
}
