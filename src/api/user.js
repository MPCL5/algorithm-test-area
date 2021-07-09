import { withAuth as req } from "api/handler";

const USERS = "/Users";

export const getUsersAll = function (search, pageSize, page, userType) {
	return req.get(
		`${USERS}?search=${search}&PageSize=${pageSize}&Page=${page}&userType=${userType}`
	);
};

export const getUser = function (id) {
	return req.get(`${USERS}/${id}`);
};

export const updateUser = function (id, lastName, firstName, password, code) {
	return req.put(`${USERS}/${id}`, { lastName, firstName, password, code });
};

export const deleteUser = function (id) {
	return req.delete(`${USERS}/${id}`);
};

export const getUserProfile = function () {
	return req.get(`${USERS}/Profile`);
};

export const postUserProfile = function (firstName, lastName) {
	return req.post(`${USERS}/Profile`, { firstName, lastName });
};

export const postUserProfileChangePassword = function (
	currentPassword,
	newPassword
) {
	return req.post(`${USERS}/Profile/ChangePassword`, {
		currentPassword,
		newPassword,
	});
};

export const postUserAdd = function (
	lastName,
	firstName,
	password,
	code,
	role
) {
	return req.post(`${USERS}/Add`, {
		lastName,
		firstName,
		password,
		code,
		role,
	});
};

export const postUserAddList = function (
	usersList
) {
	return req.post(`${USERS}/Add`, usersList);
};
