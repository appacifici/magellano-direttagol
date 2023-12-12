import '../../scss/global.scss';
import {wrapperMatch}  from "../match/store/MatchStore";
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }:{ Component:any, pageProps:any }) {    
    const { store, props } = wrapperMatch.useWrappedStore(rest);
    const { pageProps } = props;

    return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      );
}
  
export default MyApp;