import Avatar from "@/components/common/ui/Avatar";
import Image from "next/image";
import { useRef, useState } from "react";

const ProfileAvatar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // TODO: 서버에 파일 업로드 로직 추가
    }
  };
  return (
    <div className="pt-[20px] flex justify-center items-center">
      <div
        className="relative flex justify-center items-center cursor-pointer"
        onClick={handleClick}
      >
        <Avatar size="xl" src={previewUrl} />
        <Image
          src="/images/pencil.svg"
          alt="이미지 수정 버튼"
          width={27}
          height={27}
          className="absolute bottom-[2px] right-[-3px] cursor-pointer"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ProfileAvatar;
