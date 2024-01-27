const validateHostname = (hostname: string): boolean =>
  /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(hostname);

export default validateHostname;
