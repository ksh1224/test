export class Api {
  private baseURL: string;

  private request: RequestInit;

  constructor() {
    this.baseURL = 'https://my-json-server.typicode.com/kakaopay-fe/resources';
    this.request = {
      method: 'GET',
    };
  }

  private async getData<T>(path: string, request: RequestInit) {
    const response = await fetch(`${this.baseURL}/${path}`, request);
    if (response.status === 200) {
      const result: T = await response.json();
      return result;
    }
    throw new Error(`errorCode ${response.status}${response.statusText ? `: ${response.statusText}` : ''}`);
  }

  async get<T>(path: string) {
    const result = await this.getData<T>(path, {
      ...this.request,
      method: 'GET',
    });
    return result;
  }

  async post<T>(path: string) {
    const result = await this.getData<T>(path, {
      ...this.request,
      method: 'POST',
    });
    return result;
  }
}
