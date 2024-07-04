import { initialData, save, saveAll } from "../clientStorage/save";
import store from "../store";

store.subscribe(() => saveAll(store.getState()));
