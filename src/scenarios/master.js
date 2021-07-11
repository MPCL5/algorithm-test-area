import { addSuccess } from "actions";
import { login } from "api/auth";

import { deleteTimeTableBell, getTimeTableBellsAll } from "api/timeTableBell";
import { setApiToken } from "api/handler";
import {
  getUserProfile,
  postUserProfile,
  postUserProfileChangePassword,
} from "api/user";
import { formApiName } from "utils/formApiName";
import propertyCheck from "utils/propertyTest";
import store from "../store";
import { postBell } from "api/bell";
import { postDay } from "api/day";

const USER_NAME = "969601";
const CURRENT_PASSWORD = "test";
const NEW_PASSWORD = "owttset";

function showSuccess(res, message = "") {
  store.dispatch(addSuccess(formApiName(res.config), message));
}

export default async function masterScenario() {
  try {
    // Wrong password
    await login(USER_NAME, "wrong", {
      haveError: true,
      message: "Wrong username and password of master.",
    });

    // right password.
    const masterAuthRes = await login(USER_NAME, CURRENT_PASSWORD, {
      message: "Master auth.",
    });
    propertyCheck(
      masterAuthRes.data,
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
      formApiName(masterAuthRes.config)
    );
    setApiToken(masterAuthRes.data.data.token);
    showSuccess(masterAuthRes);

    // should not be permitted to create bell
    await postBell("some label for bell", 1, {
      haveError: true,
      message: "Master is not permitted to create bell",
    });

    // should not be permitted to create day
    await postDay("some label for day", 1, {
      haveError: true,
      message: "Master is not permitted to create day",
    });

    // show profile.
    const masterProfileRes = await getUserProfile();

    propertyCheck(
      masterProfileRes.data,
      {
        id: 0,
        lastName: "string",
        firstName: "string",
        code: "string",
        role: "string",
      },
      formApiName(masterProfileRes.config)
    );
    showSuccess(masterProfileRes);

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
      message: "Master new auth.",
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
    setApiToken(newAuthRes.data.data.token);
    showSuccess(newAuthRes);

    // change password.
    const changePasswordTwiceRes = await postUserProfileChangePassword(
      NEW_PASSWORD,
      CURRENT_PASSWORD
    );

    showSuccess(changePasswordTwiceRes);

    // get time table bells
    const timeTableBellsRes = await getTimeTableBellsAll(10, 1, {
      message: "Master gets time table bells successfully.",
    });
    propertyCheck(
      timeTableBellsRes.data,
      {
        list: [
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
        count: 0,
        page: 0,
        totalPages: 0,
      },
      formApiName(timeTableBellsRes.config)
    );
    showSuccess(timeTableBellsRes);

    // check if list is not empty and try to check delete permission
    if (
      Array.isArray(timeTableBellsRes.data.list) &&
      timeTableBellsRes.data.list.length
    ) {
      const timeTableBellId = timeTableBellsRes.data.list[0];
      // should not be permitted to delete time table bell
      await deleteTimeTableBell(timeTableBellId, {
        haveError: true,
        message: "Master is not permitted to delete time table bell",
      });
    }
  } catch (e) {
    // wtf moment :)
    if (process.env.NODE_ENV === "development") throw e;
  }
}
