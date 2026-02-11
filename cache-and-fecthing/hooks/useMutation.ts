"use client";

import { QueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios.js";
import { queryClient, type MutationConfig } from "../react-query.js";
import { getDataQueryKey } from "./useGetData.js";

// define the types of payload (better make new file for payload data types)
export interface IDataResponse {
  name: string;
}

// make the post function for mutationFn
export const postData = async (data: IDataResponse) => {
  const response = await axiosInstance.post(`/example`, data);

  return response.data.data;
};

// define type for mutationConfig from the mutationFn (post function)
type UsePostData = {
  mutationConfig?: MutationConfig<typeof postData>;
};

// make the hook for post the data and make it flexible to modify
export const usePostData = (params?: UsePostData) => {
  return useMutation({
    mutationFn: postData,
    ...params?.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getDataQueryKey() });
      params?.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
};

// ?usage:

// calling mutation
const { mutate, isPending } = usePostData();

// submit handler
const handleSubmit = () => {
    mutate({name: 'Hello'})
}