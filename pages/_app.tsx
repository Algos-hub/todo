import Header from "@/components/Header/Header.tsx";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import settings from "../reducers/settings.ts";
import tasks from "../reducers/tasks.ts";
import taskSelected from "@/reducers/taskSelected.ts";

const store = configureStore({
  reducer: { settings, tasks, taskSelected },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
