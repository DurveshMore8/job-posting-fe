import { ResponseType } from "@/types/response_type";

interface FetchServiceProps {
  method: string;
  endpoint: string;
  data?: { [key: string]: any } | FormData;
}

/**
 *
 * @param _props - method, endpoint, data
 * @returns
 */
export const fetchService = async (
  _props: FetchServiceProps
): Promise<ResponseType> => {
  const authToken = sessionStorage.getItem("authToken");

  let response;

  if (_props.data instanceof FormData) {
    response = await fetch(`${process.env.SERVER_URL}${_props.endpoint}`, {
      method: _props.method,
      body: _props.data,
    });
  } else {
    response = await fetch(`${process.env.SERVER_URL}${_props.endpoint}`, {
      method: _props.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(_props.data),
    });
  }

  const data = await response.json();

  const res: ResponseType = {
    code: response.status,
    data: data,
  };

  return res;
};
