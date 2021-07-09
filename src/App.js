import Main from "components/Main";
import TerminalUI from "components/Terminal";
import { Provider as ReduxProvider } from "react-redux";
import store from "store";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Main />
      <TerminalUI />
    </ReduxProvider>
  );
};

export default App;
