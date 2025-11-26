import { Client as AbstractCurseForgeClient } from "@arathi-mcps/curseforge-api";
import axios, { AxiosHeaders } from "axios";

class CurseForgeClient extends AbstractCurseForgeClient {
  protected async send<T>(url: URL): Promise<T> {
    const headers = new AxiosHeaders();
    if (this.apiKey !== undefined) {
      headers.set("x-api-key", this.apiKey);
    }

    const res = await axios.request({
      url: url.toString(),
      method: "GET",
      headers,
    });

    return res.data;
  }
}

export default CurseForgeClient;
