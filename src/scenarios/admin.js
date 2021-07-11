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
import {
  deleteUser,
  getUser,
  getUserProfile,
  getUsersAll,
  postUserAdd,
  postUserProfile,
  postUserProfileChangePassword,
  updateUser,
} from "api/user";
import { formApiName } from "utils/formApiName";
import propertyCheck from "utils/propertyTest";
import store from "../store";

const USER_NAME = "979701";
const CURRENT_PASSWORD = "test";
const NEW_PASSWORD = "testTwo";

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
    const authRes = await login(USER_NAME, CURRENT_PASSWORD, {
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
      message: "Admin new auth.",
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

    // user list.
    const userListRes = await getUsersAll("", 10, 1, undefined);

    propertyCheck(
      userListRes.data,
      {
        list: [
          {
            id: 0,
            lastName: "string",
            firstName: "string",
            code: "string",
            role: "string",
          },
        ],
        count: 0,
        page: 0,
        totalPages: 0,
      },
      formApiName(userListRes.config)
    );

    showSuccess(userListRes);

    // Add user.
    const addUserRes = await postUserAdd(
      "poorghaffar",
      "Masoud",
      "test",
      "9797" + Math.floor(Math.random() * 1000),
      "master"
    );

    propertyCheck(
      addUserRes.data,
      {
        id: 0,
        lastName: "string",
        firstName: "string",
        code: "string",
        role: "string",
      },
      formApiName(addUserRes.config)
    );

    showSuccess(addUserRes);

    // user details.
    const userDetailsRes = await getUser(addUserRes.data.data.id);

    propertyCheck(
      userDetailsRes.data,
      {
        id: 0,
        lastName: "string",
        firstName: "string",
        code: "string",
        role: "string",
      },
      formApiName(userDetailsRes.config)
    );

    showSuccess(
      userDetailsRes,
      "Details with Id: " + userDetailsRes.data.data.id
    );

    // update user
    const updateUserRes = await updateUser(
      userDetailsRes.data.data.id,
      "lool",
      "lulz"
    );

    propertyCheck(
      updateUserRes.data,
      {
        id: 0,
        lastName: "string",
        firstName: "string",
        code: "string",
        role: "string",
      },
      formApiName(updateUserRes.config)
    );

    showSuccess(
      userDetailsRes,
      "Updated with Id: " + updateUserRes.data.data.id
    );

    // delete user.
    const deleteUserRes = await deleteUser(updateUserRes.data.data.id);

    showSuccess(
      deleteUserRes,
      "Details with Id: " + updateUserRes.data.data.id
    );

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
