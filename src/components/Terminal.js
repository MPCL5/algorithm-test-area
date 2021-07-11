import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Terminal, { ColorMode, LineType } from "react-terminal-ui";
import "./terminal.css";

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
import axiosIns, { setBaseURL } from "api/handler";
import masterScenario from "scenarios/master";
import studentScenario from "scenarios/student";

const progressbarUnitsCount = 40;

const FIXED_LINES = [
	{
		type: LineType.Output,
		value: "Welcome to final project testing area",
	},
	{
		type: LineType.Output,
		value: "Developed by: MPCL5 and AmirHeidariKhoram",
	},
	{
		type: LineType.Output,
		value: "Available commands: reset, set_base URL, test_all, test_admin, test_master, test_student",
	},
	{
		type: LineType.Output,
		value: "Enter command: ",
	},
];

const TerminalUI = () => {
	const dispatch = useDispatch();
  const [testCount, setTestCount] = useState(0);
	const [axiosBaseURL, setAxiosBaseURL] = useState(axiosIns.defaults.baseURL);
	const testedItems = useSelector((state) => state.tester.testedItems);
	const passedItems = useSelector((state) => state.tester.passed);
	// const progress = useSelector(state => state.tester.passed / state.tester.total)
	const [latestProgressId, setlatestProgressId] = useState("");
	const [latestAddedCount, setLatestAddedCount] = useState(0);
	const [terminalLineData, setTerminalLineData] = useState([
		...FIXED_LINES,
		// {
		//   kid: "progressbar",
		//   type: LineType.Output,
		//   value: DisplayProgress(progress, progressbarUnitsCount),
		// },
		...testedItems.map((ti) => ({
			type: LineType.Output,
			value:
				[BADE_RESPONSE, INVALID_DATA, MISSING_PROPERTY].indexOf(
					ti.type
				) === -1
					? SuccessText(`${ti.api} ${ti.message}`)
					: ErrorText(`${ti.api} ${ti.message}`),
		})),
	]);

	useEffect(() => {
		if (testedItems.length >= latestAddedCount) {
			const latestList = testedItems.slice(latestAddedCount);
			let localPassed = 0;
			testedItems.forEach((element) => {
				console.log({ element });
				if (element.isRequestOk) localPassed += 1;
			});
			let localProgress = 0;
			if (testedItems.length === 0) localProgress = 0;
			else localProgress = localPassed / testCount;

			console.log({ localProgress });
			setLatestAddedCount((prev) => prev + latestList.length);
			const latestProgressBarData = terminalLineData.find(
				(item) => item.kid === latestProgressId
			);
			setTerminalLineData((prev) => [
				...prev.filter((prevItem) => prevItem.kid !== latestProgressId),
				...latestList.map((ti) => ({
					type: LineType.Output,
					value:
						[BADE_RESPONSE, INVALID_DATA, MISSING_PROPERTY].indexOf(
							ti.type
						) === -1
							? SuccessText(`${ti.api} ${ti.message}`)
							: ErrorText(`${ti.api} ${ti.message}`),
				})),
				{
					...latestProgressBarData,
					value: DisplayProgress(
						localProgress,
						progressbarUnitsCount
					),
				},
			]);
		} else {
			// setTerminalLineData([]);
			setLatestAddedCount(0);
		}
		//eslint-disable-next-line
	}, [testedItems]);

	// useEffect(() => {
	//   setTerminalLineData(prev => {
	//     const newItems = prev.map(line => {
	//       if (line.kid === latestProgressId)
	//         return {
	//           ...line,
	//           value: DisplayProgress(progress, progressbarUnitsCount)
	//         }
	//       else return line
	//     })

	//     return newItems
	//   })
	//   //eslint-disable-next-line
	// }, [progress])

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
				setAxiosBaseURL(args[0]);
				setBaseURL(args[0]);
				break;

			case "test_all":
        setTestCount(40)
        setTerminalLineData([...FIXED_LINES]);
				dispatch(resetTester());
				setBaseURL(process.env.REACT_APP_DOMAIN);
        adminScenario()
        masterScenario()
        studentScenario()
				break;

			case "test_admin":
        setTestCount(22)
        setTerminalLineData([...FIXED_LINES]);
				dispatch(resetTester());
				setBaseURL(process.env.REACT_APP_DOMAIN);
				addProgressbar();
				adminScenario();
				break;

			case "test_master":
        setTestCount(9)
        setTerminalLineData([...FIXED_LINES]);
				dispatch(resetTester());
				setBaseURL(process.env.REACT_APP_DOMAIN);
				addProgressbar();
				masterScenario();
				break;

			case "test_student":
        setTestCount(9)
        setTerminalLineData([...FIXED_LINES]);
				dispatch(resetTester());
				setBaseURL(process.env.REACT_APP_DOMAIN);
				addProgressbar();
				studentScenario();
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
						value: WarningText(
							`'${newCommand}' is not recognized as command.`
						),
					},
				]);
				break;
		}
	};

	// useEffect(() => {
	//   // adminScenario();
	//   const pinterval = setInterval(() => {
	//     //eslint-disable-next-line
	//     progress += 0.01;
	//     setTerminalLineData((prev) =>
	//       prev.map((l) =>
	//         l.kid !== "progressbar"
	//           ? l
	//           : {
	//               ...l,
	//               value: DisplayProgress(progress, progressbarUnitsCount),
	//             }
	//       )
	//     );
	//   }, 300);

	//   return () => {
	//     clearInterval(pinterval);
	//   };
	//   //eslint-disable-next-line
	// }, []);

	const addProgressbar = () => {
		let progressId = String(Date.now());
		setlatestProgressId(progressId);
		const progressView = {
			kid: progressId,
			type: LineType.Output,
			value: DisplayProgress(0, progressbarUnitsCount),
		};
		setTerminalLineData((prev) => [...prev, progressView]);
		console.log("addded progress");
	};

	return (
		<div
			className="container"
			style={{ position: "absolute", height: "100vh", width: "100%" }}
		>
			<Terminal
				name={`Passed: ${passedItems} || Base URL: ${axiosBaseURL}`}
				colorMode={ColorMode.Dark}
				lineData={terminalLineData}
				onInput={handlerNewCommand}
			/>
		</div>
	);
};

export default TerminalUI;
