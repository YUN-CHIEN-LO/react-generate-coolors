import React, { useState } from "react";
import ColorBoard from "./components/color-board/ColorBoard";

import Alert from "./components/alert/Alert";
import { Provider } from "./context/alert";
function App() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
  const context = {
    message: message,
    showAlert: (message) => {
      setMessage((x) => message);
      setAlertVisible((x) => false);
      setAlertVisible((x) => true);
      const timer = setTimeout(() => {
        setAlertVisible((x) => false);
        clearTimeout(timer);
      }, 3000);
    },
  };
  return (
    <Provider value={context}>
      <div className="App">
        <ColorBoard />
        {alertVisible && <Alert message={context.message} />}
      </div>
    </Provider>
  );
}

export default App;
