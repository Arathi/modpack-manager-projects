import { AbstractClient } from "./abstract-client";

export class Client extends AbstractClient {
  async send<R>(method: string, url: URL): Promise<R> {
    const headers: Record<string, string> = {};
    if (this.apiKey !== undefined) {
      headers["x-api-key"] = this.apiKey;
    }

    const res = await fetch(url, {
      method,
      headers,
    });

    if (res.status !== 200) {
      console.error("发送请求失败");
      throw new Error("发送请求失败");
    }

    return (await res.json()) as R;
  }
}
