import type {} from "@redux-devtools/extension";
import { proxy } from "valtio";
import { devtools, subscribeKey } from "valtio/utils";

const KEY_CURSE_FORGE_API_KEY = "CURSE_FORGE_API_KEY";

type State = {
  curseforgeApiKey: string | null;
};

export const store = proxy<State>({
  curseforgeApiKey: localStorage.getItem(KEY_CURSE_FORGE_API_KEY),
});

subscribeKey(store, "curseforgeApiKey", (value) => {
  if (value === null) {
    localStorage.removeItem(KEY_CURSE_FORGE_API_KEY);
  } else {
    localStorage.setItem(KEY_CURSE_FORGE_API_KEY, value);
  }
});

devtools(store, {
  name: "settings",
  enabled: true,
});
