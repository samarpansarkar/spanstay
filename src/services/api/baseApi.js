import { createApi } from "@reduxjs/toolkit/query/react";

import axios from "axios";

const axiosBaseQuery =
  (
    { baseUrl } = {
      baseUrl: "",
    },
  ) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });

      return {
        data: result.data,
      };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Hotels", "Bookings", "Users"],

  endpoints: () => ({}),
});
