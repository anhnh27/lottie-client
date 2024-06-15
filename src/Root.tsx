import { ThemeProvider } from "@emotion/react";
import { FC } from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { Client, Provider as GrahQLProvider, fetchExchange } from "urql";
import TopNavigation from "./components/top-navigation";
import { store } from "./store";
import theme from "./theme";

const client = new Client({
  url: process.env.VITE_API_BASE_URL,
  exchanges: [fetchExchange],
  preferGetMethod: "force",
  fetchOptions: {
    headers: {
      "Apollo-Require-Preflight": "true",
    },
  },
});

const Root: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GrahQLProvider value={client}>
          <TopNavigation />
          <div className="flex flex-grow">
            <div className="container mx-auto py-4">
              <Outlet />
            </div>
          </div>
        </GrahQLProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default Root;
