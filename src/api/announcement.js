import { withAuth as req } from "api/handler";

const ANNOUNCEMENTS = "/Announcements";

/**
 * @returns promise
 */
export const getAnnouncementsAll = function (
	masterId,
	timeTableId,
	pageSize,
	page
) {
	return req.get(
		`${ANNOUNCEMENTS}?MasterId=${masterId}&TimeTableId=${timeTableId}&PageSize=${pageSize}&Page=${page}`
	);
};

/**
 * @returns promise
 * @param {string} timeTableId id
 * @param {string} message message
 */
export const postAnnouncement = function (timeTableId, message) {
	return req.post(`${ANNOUNCEMENTS}`, { timeTableId, message });
};

/**
 * @returns promise
 * @param {string} announcementId id
 */
export const getAnnouncement = function (id) {
	return req.get(`${ANNOUNCEMENTS}/${id}`);
};

/**
 * @returns promise
 * @param {string} announcementId id
 */
export const deleteAnnouncement = function (id) {
	return req.delete(`${ANNOUNCEMENTS}/${id}`);
};
