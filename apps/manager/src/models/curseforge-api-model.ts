import { model } from '@modern-js/runtime/model';

const CURSE_FORGE_API_KEY = `CURSE_FORGE_API_KEY`;

interface State {
  apiKey: string;
}

const curseforgeApiModel = model<State>('curseforge-api').define({
  state: {
    apiKey: localStorage.getItem(CURSE_FORGE_API_KEY),
  },
  actions: {
    setApiKey: (state, payload) => {
      state.apiKey = payload;
      localStorage.setItem(CURSE_FORGE_API_KEY, payload);
    },
  },
});

export default curseforgeApiModel;
