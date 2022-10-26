import {store} from "../store/store";
import { Provider } from 'react-redux'
import NavBar from "../components/NavBar";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <Provider store={store}>
      <NavBar />
      <Component {...pageProps} />
    </Provider>

  )
};

export default App;