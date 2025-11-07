import Reactotron from "reactotron-react-js";
import reactotronZustand from "reactotron-plugin-zustand";
import { useMainStore } from "@/stores/main.store";

if (typeof window !== "undefined") {
  Reactotron.configure({ name: "App ERP Mecânica" })
    .use(
      reactotronZustand({
        stores: [
          { name: "mainStore", store: useMainStore },
        ],
      })
    )
    .connect(); // let's connect!
  console.tron = Reactotron; // Para facilitar o uso do console.tron.log
}

export default Reactotron;
