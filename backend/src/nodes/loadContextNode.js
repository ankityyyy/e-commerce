import { getHistory } from "../memory/shortMemory.js";

export const loadContextNode = async (state) => {
  return {
    ...state,
    history: getHistory(state.user_id)
  };
};