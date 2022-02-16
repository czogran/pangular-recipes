export function isNullOrUndefined<T>(field: T): boolean {
  return field === null || field === undefined;
}

export function isEmptyString(field: string): boolean {
  return field === '' || isNullOrUndefined(field);
}

export function deepClone<T>(field: T): T {
  return JSON.parse(JSON.stringify(field));
}
