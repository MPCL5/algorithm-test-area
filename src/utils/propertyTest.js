import { addMissingPropError } from "actions";
import store from "../store";

function checkResWithSchema(
  response,
  schema,
  apiName,
  parentProperty = "data."
) {
  for (const item in schema) {
    if (response[item] === undefined) {
      store.dispatch(addMissingPropError(apiName, parentProperty + item));
      throw new Error("Missing property: " + parentProperty + item);
    }

    // TODO: add type checking.
    console.log("checked: " + parentProperty + item);

    if (typeof schema[item] === "object")
      return checkResWithSchema(
        response[item],
        schema[item],
        apiName,
        parentProperty + item + "."
      );
  }
}

function propertyCheck(response, swaggerIns, apiName) {
  if (response.data === undefined) {
    store.dispatch(addMissingPropError(apiName, "data"));
    throw new Error("Missing property: data");
  }

  checkResWithSchema(response.data, swaggerIns, apiName);
}

export default propertyCheck;
