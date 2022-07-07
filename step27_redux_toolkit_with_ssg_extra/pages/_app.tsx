import { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import { wrapper } from "../store/store";

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>

  )
};

export default wrapper.withRedux(App);