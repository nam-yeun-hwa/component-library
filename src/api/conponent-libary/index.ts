import { ApiResponse } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ContractIdxParam, ContractResponse } from "../types";
import { fetchContract, fetchContractByIndex, postContract } from "..";
import { AxiosResponse } from "axios";
import api from "@/lib/api/axios";
import { indexParam } from "./type";

// 조회
export const useLibrary = () => {
  return useQuery<ContractResponse[], Error>({
    queryKey: ["library"], // Unique key
    queryFn: fetchContract, // The fetch function
  });
};

// 상세
export const useContractByIndex = (contractIdx: number) => {
  return useQuery<ApiResponse<indexParam>, Error>({
    queryKey: ["contract", contractIdx],
    queryFn: () => fetchContractByIndex(contractIdx),
    enabled: !!contractIdx,
  });
};

// 삭제
export const deleteContract = async (contractIdx: number): Promise<ApiResponse<unknown>> => {
  const response: AxiosResponse<ApiResponse<unknown>> = await api.delete(`/contract/${contractIdx}`);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("계약 삭제에 실패했습니다.");
};

// 등록
export const usePostContract = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ContractResponse>, Error, FormData>({
    mutationFn: postContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
    onError: (error) => {
      console.error("Contract creation error:", error.message);
    },
  });
};
