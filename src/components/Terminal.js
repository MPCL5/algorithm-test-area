import { getBellsAll } from "api/bell";
import { useEffect } from "react";
import { useState } from "react";
import Terminal, { ColorMode, LineType } from "react-terminal-ui";
// eslint-disable-next-line no-unused-vars
import { ErrorText, SuccessText } from "utils/terminal";

const TerminalUI = () => {
  const [terminalLineData, setTerminalLineData] = useState([
    {
      type: LineType.Output,
      value: "Welcome to the React Terminal UI Demo!",
    },
    { type: LineType.Input, value: "Some previous input received" },
  ]);

  const handlerNewCommand = (command) => {
    setTerminalLineData((prev) => [
      ...prev,
      {
        type: LineType.Input,
        value: command,
      },
    ]);

    // ... do the rest here
  };

  useEffect(() => {
    getBellsAll(undefined, undefined, { test: true });
  }, []);

  return (
    <div className="container">
      <Terminal
        name="React Terminal Usage Example"
        colorMode={ColorMode.Dark}
        lineData={terminalLineData}
        onInput={handlerNewCommand}
      />
    </div>
  );
};

export default TerminalUI;
