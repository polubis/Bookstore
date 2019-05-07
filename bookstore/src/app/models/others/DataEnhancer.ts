export interface DataEnhancer<T> {
  isLoading?: boolean;
  error?: {
    message: string;
    code: number;
  };
  data: T | T[];
}
