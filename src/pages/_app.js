import '../styles/globals.scss'
import "../styles/home.scss";
import "../styles/card.scss";
import "../styles/administration.scss"
import "../styles/sidebar.scss";
import "../styles/tool.scss";
import Layout from "../components/layout";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
