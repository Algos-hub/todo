import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import darkTheme from "../reducers/dark.ts";
import tasks from "../reducers/tasks.ts";

const store = configureStore({
  reducer: { darkTheme, tasks },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}