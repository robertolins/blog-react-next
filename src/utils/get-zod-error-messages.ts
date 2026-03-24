import { ZodSafeParseError } from 'zod';

export function getZodErrorMessages<T>({
  error,
}: ZodSafeParseError<T>): string[] {
  return error.issues.map(issue => issue.message);
}
