"use client";

import { axiosInstance } from "../axios.js";
import type { QueryConfig } from "../react-query.js";
import { queryOptions, useQuery } from "@tanstack/react-query";

// define the types of the response (better make new file for response data types)
export interface IDataResponse {
  name: string;
}

// make the fetch function for queryFn
export const fetchData = async () => {
  const response = await axiosInstance.get<{ data: IDataResponse[] }>(
    `/example`
  );

  return response.data.data;
};

// define the queryKey inside the hook so mutation can import from here
export const getDataQueryKey = () => ["example"];

// make the query options with queryKey and queryFn
const getDataQueryOptions = () => {
  return queryOptions({
    queryKey: getDataQueryKey(),
    queryFn: fetchData,
  });
};

// define type for queryConfig from the queryFn (fetch function)
type UseGetData = {
  queryConfig?: QueryConfig<typeof fetchData>;
};

// make the hook for get the datas and make it flexible to modify
export const useGetData = (params: UseGetData = {}) => {
  return useQuery({
    ...getDataQueryOptions(),
    ...params.queryConfig,
  });
};

// ?usage:

// calling query
const { data, isPending } = useGetData();

// customizable
const {
  data: dataCustom,
  isPending: isPendingCustom,
  error,
} = useGetData({
  // queryConfig: {},
});
