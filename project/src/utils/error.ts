export class ApiError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: any) => {
  const message = error.response?.data?.msg || 'Error al conectar con el servidor';
  return new ApiError(message, error.response?.status?.toString());
};