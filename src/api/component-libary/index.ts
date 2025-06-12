import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { AxiosResponse } from "axios";
import { IndexParam, LibraryResponse } from "./type";

// get
export const fetchLibrary = async (): Promise<LibraryResponse[]> => {
  const res: AxiosResponse<ApiResponse<LibraryResponse[]>> = await api.get("/library");
  if (res.status === 200) {
    if (res.data.data) {
      return res.data.data;
    }
  }
  throw new Error("조회에 실패했습니다.");
};

// 상세 get
export const fetchLibraryByIndex = async (libraryIdx: number): Promise<ApiResponse<IndexParam>> => {
  const res: AxiosResponse<ApiResponse<IndexParam>> = await api.get(`/library/${libraryIdx}`);
  if (res.status === 200) {
    return res.data;
  }
  throw new Error("상세 정보를 가져오는데 실패했습니다.");
};

//삭제 delete
export const deleteContract = async (libraryIdx: number): Promise<ApiResponse<unknown>> => {
  const response: AxiosResponse<ApiResponse<unknown>> = await api.delete(`/library/${libraryIdx}`);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("삭제에 실패했습니다.");
};

// 등록 post
export const postLibrary = async (formData: FormData): Promise<ApiResponse<LibraryResponse>> => {
  const res: AxiosResponse<ApiResponse<LibraryResponse>> = await api.post("/library", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status === 200) {
    return res.data;
  }
  throw new Error("폼 생성에 실패했습니다.");
};
