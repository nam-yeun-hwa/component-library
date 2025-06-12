import { ApiResponse } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLibrary, fetchLibraryByIndex, postLibrary } from "..";
import { AxiosResponse } from "axios";
import { IndexParam, LibraryResponse } from "../type";
import api from "@/lib/api/axios";

// 조회
export const useLibrary = () => {
  return useQuery<LibraryResponse[], Error>({
    queryKey: ["library"], // Unique key
    queryFn: fetchLibrary, // The fetch function
  });
};

// 상세
export const useLibraryByIndex = (libraryIdx: number) => {
  return useQuery<ApiResponse<IndexParam>, Error>({
    queryKey: ["contract", libraryIdx],
    queryFn: () => fetchLibraryByIndex(libraryIdx),
    enabled: !!libraryIdx,
  });
};

// 삭제
export const useDeleteLibrary = async (libraryIdx: number): Promise<ApiResponse<unknown>> => {
  const response: AxiosResponse<ApiResponse<unknown>> = await api.delete(`/Library/${libraryIdx}`);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("계약 삭제에 실패했습니다.");
};

// 등록
export const usePostLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<LibraryResponse>, Error, FormData>({
    mutationFn: postLibrary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraryPost"] });
    },
    onError: (error) => {
      console.error("libraryPost creation error:", error.message);
    },
  });
};
