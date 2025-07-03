export const base_url = 'http://localhost:8080/account';
export const createToken = (login: string, password: string) => `Basic ${btoa(login + ':' + password)}`;