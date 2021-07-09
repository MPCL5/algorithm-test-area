import { Provider as ReduxProvider } from "react-redux";
import store from "store";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <div>We are here.</div>
    </ReduxProvider>
  );
};

export default App;
