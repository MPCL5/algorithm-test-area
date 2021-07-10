export const ErrorText = (text) => (
	<span style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: text }} />
);
export const WarningText = (text) => (
	<span
		style={{ color: "yellow" }}
		dangerouslySetInnerHTML={{ __html: text }}
	/>
);
export const InfoText = (text) => (
	<span
		style={{ color: "blue" }}
		dangerouslySetInnerHTML={{ __html: text }}
	/>
);
export const SuccessText = (text) => (
	<span
		style={{ color: "green" }}
		dangerouslySetInnerHTML={{ __html: text }}
	/>
);

export const DisplayProgress = (progress, totalBlockCount) => {
	let length = Math.floor(progress * totalBlockCount);
	if (length >= totalBlockCount) {
		length = totalBlockCount;
		progress = 1;
	}
	let blocks = [];
	for (let i = 0; i < length; i++) {
		blocks.push(
			<div
				key={i}
				style={{
					backgroundColor: "#FFFFFF80",
					height: "80%",
					width: "10px",
					border: "none",
					marginRight: "1px",
				}}
			></div>
		);
	}
	return (
		<div style={{ display: "flex", flexFlow: "row", height: "27px" }}>
			{blocks}
			<span style={{ marginLeft: "5px" }}>{`${String(
				progress * 100
			).slice(0, 4)}%`}</span>
		</div>
	);
};
