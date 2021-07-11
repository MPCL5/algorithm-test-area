import { addSuccess } from "actions";
import { login } from "api/auth";
import { setApiToken } from "api/handler";
import { getTimeTable, getTimeTablesAll } from "api/timeTable";
import {
	getUserProfile,
	postUserProfile,
	postUserProfileChangePassword,
} from "api/user";
import { formApiName } from "utils/formApiName";
import propertyCheck from "utils/propertyTest";
import store from "../store";

const USER_NAME = "989801";
const CURRENT_PASSWORD = "test";
const NEW_PASSWORD = "tnedutsthkabdab";

function showSuccess(res, message = "") {
	store.dispatch(addSuccess(formApiName(res.config), message));
}

export default async function adminScenario() {
	try {
		// Wrong password
		await login(USER_NAME, "test", {
			haveError: true,
			message: "Wrong password.",
		});

		// Right password.
		const authRes = await login(USER_NAME, CURRENT_PASSWORD, {
			message: "Student auth.",
		});

		propertyCheck(
			authRes.data,
			{
				token: "string",
				expireAt: "2021-07-10T05:21:18.776Z",
				user: {
					id: 0,
					lastName: "string",
					firstName: "string",
					code: "string",
					role: "string",
				},
			},
			formApiName(authRes.config)
		);

		setApiToken(authRes.data.data.token);

		showSuccess(authRes);

		// show profile.
		const userProfileRes = await getUserProfile();

		propertyCheck(
			userProfileRes.data,
			{
				id: 0,
				lastName: "string",
				firstName: "string",
				code: "string",
				role: "string",
			},
			formApiName(userProfileRes.config)
		);

		showSuccess(userProfileRes);

		// update profile.
		const updateProfileRes = await postUserProfile("test", "changedByTest");
		propertyCheck(
			updateProfileRes.data,
			{
				id: 0,
				lastName: "string",
				firstName: "string",
				code: "string",
				role: "string",
			},
			formApiName(updateProfileRes.config)
		);

		showSuccess(updateProfileRes);

		// change password.
		const changePasswordRes = await postUserProfileChangePassword(
			CURRENT_PASSWORD,
			NEW_PASSWORD
		);
		showSuccess(changePasswordRes);
		// new login.
		const newAuthRes = await login(USER_NAME, NEW_PASSWORD, {
			message: "Student new auth.",
		});
		propertyCheck(
			newAuthRes.data,
			{
				token: "string",
				expireAt: "2021-07-10T05:21:18.776Z",
				user: {
					id: 0,
					lastName: "string",
					firstName: "string",
					code: "string",
					role: "string",
				},
			},
			formApiName(newAuthRes.config)
		);
		const studentId = newAuthRes.data.user && newAuthRes.data.user.id;
		setApiToken(newAuthRes.data.data.token);
		showSuccess(newAuthRes);

		if (studentId) {
			// student should be able to get time table bells
			const timeTables = await getTimeTablesAll(
				studentId,
				undefined,
				undefined,
				10,
				1,
				{
					message:
						"Stundent must be able to get time tables list without defining course and master",
				}
			);
			propertyCheck(
				timeTables.data,
				{
					list: [
						{
							id: 0,
							master: {
								id: 0,
								userId: 0,
								user: {
									id: 0,
									lastName: "string",
									firstName: "string",
									code: "string",
									role: "string",
								},
							},
							timeTableBells: [
								{
									id: 0,
									day: {
										id: 0,
										label: "string",
										dayOfWeek: 0,
									},
									bell: {
										id: 0,
										label: "string",
										bellOfDay: 0,
									},
								},
							],
							course: {
								id: 0,
								title: "string",
								unitsCount: 0,
							},
						},
					],
					count: 0,
					page: 0,
					totalPages: 0,
				},
				formApiName(timeTables.config)
			);
      showSuccess(timeTables);
			// student should get a single time table information (if there exists any time table)
			if (
				Array.isArray(timeTables.data.list) &&
				timeTables.data.list.length > 0
			) {
        const targetTimeTableId = timeTables.data.list[0].id
				const singleTimeTable = await getTimeTable(
					targetTimeTableId,
					{
						message:
							"Stundent must be able to get single time table information",
					}
				);
				propertyCheck(
					singleTimeTable.data,
					{
						id: 0,
						master: {
							id: 0,
							userId: 0,
							user: {
								id: 0,
								lastName: "string",
								firstName: "string",
								code: "string",
								role: "string",
							},
						},
						timeTableBells: [
							{
								id: 0,
								day: {
									id: 0,
									label: "string",
									dayOfWeek: 0,
								},
								bell: {
									id: 0,
									label: "string",
									bellOfDay: 0,
								},
							},
						],
						course: {
							id: 0,
							title: "string",
							unitsCount: 0,
						},
					},
					formApiName(singleTimeTable.config)
				);
        showSuccess(singleTimeTable);
			}
		}
	} catch (e) {
		// wtf moment :)
		if (process.env.NODE_ENV === "development") throw e;
	}
}
