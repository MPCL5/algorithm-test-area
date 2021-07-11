import req from "api/handler";

const USERS = "/Users";

export const getUsersAll = function (
  search,
  PageSize,
  Page,
  userType,
  config = {}
) {
  return req.get(USERS, {
    params: { search, PageSize, Page, userType },
    ...config,
  });
};

export const getUser = function (id, config = {}) {
  return req.get(`${USERS}/${id}`, { ...config });
};

export const updateUser = function (
  id,
  lastName,
  firstName,
  password,
  code,
  config = {}
) {
  return req.put(
    `${USERS}/${id}`,
    { lastName, firstName, password, code },
    { ...config }
  );
};

export const deleteUser = function (id, config = {}) {
  return req.delete(`${USERS}/${id}`, { ...config });
};

export const getUserProfile = function (config = {}) {
  return req.get(`${USERS}/Profile`, { ...config });
};

export const postUserProfile = function (firstName, lastName, config = {}) {
  return req.post(`${USERS}/Profile`, { firstName, lastName }, { ...config });
};

export const postUserProfileChangePassword = function (
  currentPassword,
  newPassword,
  config = {}
) {
  return req.post(
    `${USERS}/Profile/ChangePassword`,
    {
      currentPassword,
      newPassword,
    },
    { ...config }
  );
};

export const postUserAdd = function (
  lastName,
  firstName,
  password,
  code,
  role,
  config = {}
) {
  return req.post(
    `${USERS}/Add`,
    {
      lastName,
      firstName,
      password,
      code,
      role,
    },
    { ...config }
  );
};

export const postUserAddList = function (usersList, config = {}) {
  return req.post(`${USERS}/Add`, usersList, { ...config });
};
