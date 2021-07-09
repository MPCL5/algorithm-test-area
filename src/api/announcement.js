import req from "api/handler";

const ANNOUNCEMENTS = "/Announcements";

/**
 * @returns promise
 */
export const getAnnouncementsAll = function (
  MasterId,
  TimeTableId,
  PageSize,
  Page,
  config = {}
) {
  return req.get(ANNOUNCEMENTS, {
    params: { MasterId, TimeTableId, PageSize, Page },
    ...config,
  });
};

/**
 * @returns promise
 * @param {string} timeTableId id
 * @param {string} message message
 */
export const postAnnouncement = function (timeTableId, message, config = {}) {
  return req.post(`${ANNOUNCEMENTS}`, { timeTableId, message }, { ...config });
};

/**
 * @returns promise
 * @param {string} announcementId id
 */
export const getAnnouncement = function (id, config = {}) {
  return req.get(`${ANNOUNCEMENTS}/${id}`, { ...config });
};

/**
 * @returns promise
 * @param {string} announcementId id
 */
export const deleteAnnouncement = function (id, config = {}) {
  return req.delete(`${ANNOUNCEMENTS}/${id}`, { ...config });
};
