import "../styles/globals.css";
import "../styles/home.scss";
import "../styles/card.scss";
import "../styles/administration.scss";
import "../styles/sidebar.scss";
import "../styles/tool.scss";
import "../styles/header.scss";
import "../styles/counter.scss";
import "../styles/timer.scss";
import "../styles/stream.scss";
import "../styles/coinFlip.scss";
import "../styles/sondage.scss";
import "../styles/surveyForm.scss";
import Layout from "../components/layout";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
