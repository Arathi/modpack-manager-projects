import type {} from "@redux-devtools/extension";
import { proxy } from "valtio";
import { devtools, subscribeKey } from "valtio/utils";

const KEY_TOKEN = "JSON_WEB_TOKEN";

type State = {
  token: string | null;
};

const store = proxy<State>({
  token: localStorage.getItem("JSON_WEB_TOKEN"),
});

subscribeKey(store, "token", (value) => {
  if (value === null) {
    localStorage.removeItem(KEY_TOKEN);
  } else {
    localStorage.setItem(KEY_TOKEN, value);
  }
});

devtools(store, {
  name: "auth",
  enabled: true,
});
