import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import store from "../../components/store";
import {
  isMaintenanceAction,
  isToManyRequestAction,
} from "../../components/store/actions/todoActions";
import { clearLocalStorageAndRedirect } from "../helpers/clearLocalStorageAndRedirect";

const apiClient = async ({
  baseurlCostum = false,
  baseurl = "",
  parameter = "",
  apiKey = "",
  method = "GET",
  customHeaders,
  body,
}) => {
  const Api = process.env.REACT_APP_API;
  const token = process.env.REACT_APP_TOKEN_GORDON;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const headers = {
    method: apiKey ? "POST" : method,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Client-Timezone": `${year}-${month}-${day}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...(token && { "X-Authorization": `Bearer ${token}` }),
      ...customHeaders,
    },
    ...(body && { body: body.toString() }),
  };
  try {
    const response = await fetch(
      `${baseurlCostum === false ? Api : ""}` +
        baseurl +
        (parameter === "" ? "" : "?" + parameter),
      headers
    );
    const result = await response.json();

    if (response.status === 200 || response.status === 400) {
      if (result.statusCode === 429) {
        store.dispatch(isToManyRequestAction(true));
      } else {
        return { result, statusCode: response.status };
      }
    } else if (response.status === 503) {
      store.dispatch(isMaintenanceAction(true));
    } else if (response.status === 401) {
      console.log(response.status);

      if (
        result.msg === "unauthorized access" ||
        result.msg === "Token Expired"
      ) {
        clearLocalStorageAndRedirect();
      }
      toast.error(result.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (response.status === 500) {
      toast.error(result.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      // Handle other status codes or throw an error
      // throw { result, statusCode: response.status };
    }
  } catch (error) {
    throw error;
  }
};

export { apiClient };
