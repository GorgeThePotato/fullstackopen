export interface Entry {
    weather: string,
    date: string,
    visibility: string,
    comment: string
}

export interface ValidationError {
    message: string;
    errors: Record<string, string[]>
  }
  
  