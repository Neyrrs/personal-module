"use client";

import { axiosInstance } from "../axios.js";
import type { QueryConfig } from "../react-query.js";
import { queryOptions, useQuery } from "@tanstack/react-query";

// define the types of the response (better make new file for response data types)
export interface IDataResponse {
  name: string;
}

// make the fetch function for queryFn
export const fetchData = async (id: string) => {
  const response = await axiosInstance.get<{ data: IDataResponse[] }>(
    `/example/${id}`
  );

  return response.data.data;
};

// define the queryKey inside the hook so mutation can import from here
export const getDataQueryKey = (id: string) => ["example", id];

// make the query options with queryKey and queryFn
const getDataQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: getDataQueryKey(id),
    queryFn: () => fetchData(id),
  });
};

// define type for queryConfig from the queryFn (fetch function)
type UseGetData = {
  queryConfig?: QueryConfig<typeof fetchData>;
  id: string;
};

// make the hook for get the datas and make it flexible to modify
export const useGetData = (params: UseGetData) => {
  return useQuery({
    ...getDataQueryOptions(params.id),
    ...params.queryConfig,
  });
};

// ?usage:

// calling query
const { data, isPending } = useGetData({ id: "12" });

// customizable
const {
  data: dataCustom,
  isPending: isPendingCustom,
  error,
} = useGetData({
  id: "12",
  // queryConfig: {},
});
