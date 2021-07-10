import { addSuccess } from "actions";
import { login } from "api/auth";
import { getBell, getBellsAll } from "api/bell";
import { setApiToken } from "api/handler";
import { formApiName } from "utils/formApiName";
import propertyCheck from "utils/propertyTest";
import store from "../store";

function showSuccess(res) {
  store.dispatch(addSuccess(formApiName(res.config)));
}

export default async function adminScenario() {
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
}
