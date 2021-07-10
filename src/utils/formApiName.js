export function formApiName(config) {
  return `${config.method.toLocaleUpperCase()} - ${config.url}`;
}
