import { AbstractClient } from "./abstract-client";

export class Client extends AbstractClient {
  async send<T>(method: string, url: URL): Promise<T> {
    const res = await fetch(url, {
      method,
    });
    if (res.status !== 200) {
      console.error(`状态码：${res.status} ${res.statusText}`);
      throw new Error();
    }

    const resBody = (await res.json()) as T;
    return resBody;
  }
}
