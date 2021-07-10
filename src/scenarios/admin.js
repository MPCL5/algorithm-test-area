import { addSuccess } from "actions";
import { login } from "api/auth";
import {
  deleteBell,
  getBell,
  getBellsAll,
  postBell,
  updateBell,
} from "api/bell";
import { getDay, getDaysAll, postDay } from "api/day";
import { setApiToken } from "api/handler";
import { formApiName } from "utils/formApiName";
import propertyCheck from "utils/propertyTest";
import store from "../store";

function showSuccess(res, message = "") {
  store.dispatch(addSuccess(formApiName(res.config), message));
}

export default async function adminScenario() {
  try {
    // Wrong password
    await login("98888888", "test", {
      haveError: true,
      message: "Wrong password.",
    });

    // right password.
    const authRes = await login("975361004", "test", {
      message: "Admin auth.",
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

    // Add bell.
    const addBellRes = await postBell("test", 10);

    propertyCheck(
      addBellRes.data,
      {
        id: 0,
        label: "string",
        bellOfDay: 0,
      },
      formApiName(addBellRes.config)
    );

    showSuccess(addBellRes);

    // Bell List.
    const bellListRes = await getBellsAll();

    propertyCheck(
      bellListRes.data,
      {
        list: [
          {
            id: 0,
            label: "string",
            bellOfDay: 0,
          },
        ],
        count: 0,
        page: 0,
        totalPages: 0,
      },
      formApiName(bellListRes.config)
    );

    showSuccess(bellListRes);

    // bell details.
    const bellDetailsRes = await getBell(addBellRes.data.data.id);

    propertyCheck(
      bellDetailsRes.data,
      {
        id: 0,
        label: "string",
        bellOfDay: 0,
      },
      formApiName(bellDetailsRes.config)
    );

    showSuccess(bellListRes, "Details with Id: " + addBellRes.data.data.id);

    // update bell
    const updateBellRes = await updateBell(
      addBellRes.data.data.id,
      "hollow",
      11
    );

    propertyCheck(
      updateBellRes.data,
      {
        id: 0,
        label: "string",
        bellOfDay: 0,
      },
      formApiName(updateBellRes.config)
    );

    showSuccess(
      updateBellRes,
      "updated bell with Id: " + addBellRes.data.data.id
    );

    // delete bell
    const deleteBellRes = await deleteBell(addBellRes.data.data.id);

    showSuccess(
      deleteBellRes,
      "deleted bell with Id: " + addBellRes.data.data.id
    );

    // add day
    const addDayRes = await postDay("testProPlus", 3);

    propertyCheck(
      addDayRes.data,
      {
        id: 0,
        label: "string",
        dayOfWeek: 0,
      },
      formApiName(addDayRes.config)
    );

    showSuccess(addDayRes);

    // day list.
    const dayListRes = await getDaysAll(10, 1);

    propertyCheck(
      dayListRes.data,
      {
        list: [
          {
            id: 0,
            label: "string",
            dayOfWeek: 0,
          },
        ],
        count: 0,
        page: 0,
        totalPages: 0,
      },
      formApiName(dayListRes.config)
    );

    showSuccess(dayListRes);

    // day details
    const dayDetails = await getDay(addDayRes.data.data.id);

    propertyCheck(
      dayDetails.data,
      {
        id: 0,
        label: "string",
        dayOfWeek: 0,
      },
      formApiName(dayDetails.config)
    );

    showSuccess(dayDetails, "Details with Id: " + addDayRes.data.data.id);

    // update day
    const updateDayRes = await updateBell(addDayRes.data.data.id, "hollow", 4);

    propertyCheck(
      updateDayRes.data,
      {
        id: 0,
        label: "string",
        bellOfDay: 0,
      },
      formApiName(updateDayRes.config)
    );

    showSuccess(updateDayRes, "updated with Id: " + addDayRes.data.data.id);

    // delete bell
    const deleteDayRes = await deleteBell(addDayRes.data.data.id);

    showSuccess(deleteDayRes, "deleted with Id: " + addDayRes.data.data.id);
  } catch (e) {
    // wtf moment :)
    if (process.env.NODE_ENV === "development") throw e;
  }
}
