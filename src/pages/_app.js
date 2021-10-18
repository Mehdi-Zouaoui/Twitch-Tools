import "../styles/globals.scss";
import "../styles/home.scss";
import "../styles/card.scss";
import "../styles/administration.scss";
import "../styles/sidebar.scss";
import "../styles/tool.scss";
import "../styles/header.scss";
import Layout from "../components/layout";
import { UserProvider } from "@auth0/nextjs-auth0";
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;