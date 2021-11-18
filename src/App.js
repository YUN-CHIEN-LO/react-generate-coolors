import React, { useState } from "react";
import ColorBoard from "./components/color-board/ColorBoard";

import Alert from "./components/alert/Alert";
import { Provider } from "./context/alert";
function App() {
  // 是否顯示通知
  const [alertVisible, setAlertVisible] = useState(false);
  // 通知訊息
  const [message, setMessage] = useState("");
  const context = {
    message: message,
    /**
     * 顯示通知
     *
     * @param {string} message - 訊息
     */
    showAlert: (message) => {
      // 指定通知訊息
      setMessage((x) => message);
      // 重製通知狀態
      setAlertVisible((x) => false);
      // 開啟通知
      setAlertVisible((x) => true);
      const timer = setTimeout(() => {
        // 關閉通知
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
