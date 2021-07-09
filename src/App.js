import Main from "components/Main";
import { Provider as ReduxProvider } from "react-redux";
import store from "store";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Main />
    </ReduxProvider>
  );
};

export default App;
