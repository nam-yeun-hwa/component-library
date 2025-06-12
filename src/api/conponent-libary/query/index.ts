import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { ContractIdxParam, ContractResponse } from "./types";
import { AxiosResponse } from "axios";
import { indexParam } from "../type";

// get
export const fetchContract = async (): Promise<libraryResponse[]> => {
  const res: AxiosResponse<ApiResponse<libraryResponse[]>> = await api.get("/library");

  if (res.status === 200) {
    return res.data;
  }
  throw new Error("조회에 실패했습니다.");
};

// 상세 get
export const fetchContractByIndex = async (idx: number): Promise<ApiResponse<indexParam>> => {
  const res: AxiosResponse<ApiResponse<ContractIdxParam>> = await api.get(`/library/${idx}`);
  if (res.status === 200) {
    return res.data;
  }
  throw new Error("상세 정보를 가져오는데 실패했습니다.");
};

//삭제 delete
export const deleteContract = async (contractIdx: number): Promise<ApiResponse<unknown>> => {
  const response: AxiosResponse<ApiResponse<unknown>> = await api.delete(
    `/library/${contractIdx}` // Corrected from /posts to /contract
  );
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("삭제에 실패했습니다.");
};

// 등록 post
export const postContract = async (formData: FormData): Promise<ApiResponse<ContractResponse>> => {
  const res: AxiosResponse<ApiResponse<ContractResponse>> = await api.post("/library", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status === 200) {
    return res.data;
  }
  throw new Error("폼 생성에 실패했습니다.");
};
