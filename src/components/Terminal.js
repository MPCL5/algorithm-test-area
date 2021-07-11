import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Terminal, { ColorMode, LineType } from "react-terminal-ui";
// eslint-disable-next-line no-unused-vars
import {
  DisplayProgress,
  ErrorText,
  SuccessText,
  WarningText,
} from "utils/terminal";
import {
  BADE_RESPONSE,
  INVALID_DATA,
  MISSING_PROPERTY,
} from "constants/ErrorTypes";
import adminScenario from "scenarios/admin";
import { resetTester } from "actions";
import { setBaseURL } from "api/handler";

const FIXED_LINES = [
  {
    type: LineType.Output,
    value: "Welcome to final project testing area",
  },
  {
    type: LineType.Output,
    value: "Developed by: MPCL5 and AmirHeidari",
  },
  {
    type: LineType.Output,
    value:
      "Available commands: reset, set_base URL, test_all, test_admin, test_master, test_student",
  },
  {
    type: LineType.Output,
    value: "Enter command: ",
  },
];

const TerminalUI = () => {
  const dispatch = useDispatch();
  const testedItems = useSelector((state) => state.tester.testedItems);
  const passedItems = useSelector((state) => state.tester.passed);
  let progress = 0;
  const [latestAddedCount, setLatestAddedCount] = useState(0);
  const [terminalLineData, setTerminalLineData] = useState([
    ...FIXED_LINES,
    {
      kid: "progressbar",
      type: LineType.Output,
      value: DisplayProgress(progress, 40),
    },
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
      // setTerminalLineData([]);
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

    const args = command.split(" ").slice(1);
    const newCommand = command.split(" ")[0];

    switch (newCommand) {
      case "set_base":
        setBaseURL(args[0]);
        break;

      case "test_all":
        break;

      case "test_admin":
        adminScenario();
        break;

      case "test_master":
        break;

      case "test_studen":
        break;

      case "reset":
        setTerminalLineData([...FIXED_LINES]);
        dispatch(resetTester());
        setBaseURL(process.env.REACT_APP_DOMAIN);
        break;

      default:
        setTerminalLineData((perv) => [
          ...perv,
          {
            type: LineType.Output,
            value: WarningText(`'${newCommand}' is not recognized as command.`),
          },
        ]);
        break;
    }
  };

  useEffect(() => {
    // adminScenario();
    const pinterval = setInterval(() => {
      //eslint-disable-next-line
      progress += 0.01;
      setTerminalLineData((prev) =>
        prev.map((l) =>
          l.kid !== "progressbar"
            ? l
            : {
                ...l,
                value: DisplayProgress(progress, 40),
              }
        )
      );
    }, 300);

    return () => {
      clearInterval(pinterval);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div
      className="container"
      style={{ position: "absolute", height: "100%", width: "100%" }}
    >
      <Terminal
        name={`Passed: ${passedItems}`}
        colorMode={ColorMode.Dark}
        lineData={terminalLineData}
        onInput={handlerNewCommand}
      />
    </div>
  );
};

export default TerminalUI;
