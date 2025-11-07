import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import "@/config/reactotron";
import { ReactQueryProvider } from "./components/ReactQueryProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ReactQueryProvider>
        <Provider>
          <App />
          <ToastContainer />
        </Provider>
      </ReactQueryProvider>
    </BrowserRouter>
);
