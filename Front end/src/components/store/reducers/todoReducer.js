const initialState = {
  isPending: false,
  isSideBar: false,
  isSearch: false,
  isMaintenanceMode: false,
  isToManyRequestMode: false,
};
const todoReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ISPENDING":
      return {
        ...state,
        isPending: payload,
      };
    case "ISSIDEBAR":
      return {
        ...state,
        isSideBar: payload,
      };
    case "ISMAINTENANCEMODE":
      return {
        ...state,
        isMaintenanceMode: payload,
      };
    case "ISTOMANYREQUESTMODE":
      return {
        ...state,
        isToManyRequestMode: payload,
      };
    case "ISSEARCH":
      return {
        ...state,
        isSearch: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default todoReducer;
