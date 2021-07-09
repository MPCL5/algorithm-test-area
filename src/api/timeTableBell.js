import req from "api/handler";

const TIME_TABLE_BELLS = "/TimeTableBells";

export const getTimeTableBellsAll = function (PageSize, Page, config) {
  return req.get(TIME_TABLE_BELLS, { params: { PageSize, Page }, ...config });
};

export const postTimeTableBells = function (
  dayId,
  bellId,
  timeTableId,
  config
) {
  return req.post(
    `${TIME_TABLE_BELLS}`,
    { dayId, bellId, timeTableId },
    { ...config }
  );
};

export const getTimeTableBell = function (id, config) {
  return req.get(`${TIME_TABLE_BELLS}/${id}`, { ...config });
};

export const deleteTimeTableBell = function (id, config) {
  return req.delete(`${TIME_TABLE_BELLS}/${id}`, { ...config });
};
