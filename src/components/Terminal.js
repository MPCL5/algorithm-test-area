import { getBellsAll } from "api/bell";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Terminal, { ColorMode, LineType } from "react-terminal-ui";
// eslint-disable-next-line no-unused-vars
import { ErrorText, SuccessText } from "utils/terminal";
import {
  BADE_RESPONSE,
  INVALID_DATA,
  MISSING_PROPERTY,
} from "constants/ErrorTypes";
import adminScenario from "scenarios/admin";

const TerminalUI = () => {
  let testedItems = useSelector((state) => state.tester.testedItems);

  const [latestAddedCount, setLatestAddedCount] = useState(0);
  const [terminalLineData, setTerminalLineData] = useState([
    ...testedItems.map((ti) => ({
      type: LineType.Output,
      value:
        [BADE_RESPONSE, INVALID_DATA, MISSING_PROPERTY].indexOf(ti.type) === -1
          ? SuccessText(`${ti.api} ${ti.message}`)
          : ErrorText(`${ti.api} ${ti.message}`),
    })),
  ]);

  useEffect(() => {
    if (testedItems.length >= latestAddedCount) {
      const latestList = testedItems.slice(latestAddedCount);
      setLatestAddedCount((prev) => prev + latestList.length);
      setTerminalLineData((prev) => [
        ...prev,
        ...latestList.map((ti) => ({
          type: LineType.Output,
          value:
            [BADE_RESPONSE, INVALID_DATA, MISSING_PROPERTY].indexOf(ti.type) ===
            -1
              ? SuccessText(`${ti.api} ${ti.message}`)
              : ErrorText(`${ti.api} ${ti.message}`),
        })),
      ]);
    } else {
      setTerminalLineData([
        {
          type: LineType.Output,
          value: "Enter command",
        },
      ]);
      setLatestAddedCount(0);
    }
    //eslint-disable-next-line
  }, [testedItems]);

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
    adminScenario();
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
