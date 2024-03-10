import React from "react";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URL,
});
const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})
loadDevMessages()
loadErrorMessages()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App/>
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>
);

