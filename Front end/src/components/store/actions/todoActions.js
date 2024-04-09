export const isMaintenanceAction = (data) => {
  return {
    type: "ISMAINTENANCEMODE",
    payload: data,
  };
};
export const isToManyRequestAction = (data) => {
  return {
    type: "ISTOMANYREQUESTMODE",
    payload: data,
  };
};
export const isPending = (data) => {
  return {
    type: "ISPENDING",
    payload: data,
  };
};
export const isSideBar = (data) => {
  return {
    type: "ISSIDEBAR",
    payload: data,
  };
};
export const searchAction = (data) => {
  return {
    type: "ISSEARCH",
    payload: data,
  };
};
