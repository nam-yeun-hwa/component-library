import { useGetMe } from "@/api/mypage/query";
import { GetMeResponse } from "@/api/mypage/types";
import { ApiResponse } from "@/types/api";
import { useRouter } from "next/navigation";

const useProfile = (initialData: ApiResponse<GetMeResponse>) => {
  const router = useRouter();
  const handleGoToChangePassword = () => {
    router.push("/mypage/profile/change-password");
  };

  const { data, isLoading } = useGetMe(initialData);

  return {
    handleGoToChangePassword,
    profileData: data?.data,
    isLoading,
  };
};

export default useProfile;
