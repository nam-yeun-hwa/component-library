import useSwiperStore from "@/store/common/useSwiperStore";
import React, { useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

/**
 * MyDropzone
 * 에디트 모드에서 이미지 드래그 앤 드롭 사용
 */
const Dropzone: React.FC = () => {
  const { slides, addSlide } = useSwiperStore();

  // onDrop 핸들러: 파일이 드롭되었을 때 호출
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: FileWithPath) => {
        console.log(`File: ${file.name}, Path: ${file.path}`);
      });

      const file = acceptedFiles[0];
      const filePreview = URL.createObjectURL(file);
      // ========================= //
      // ====== 슬라이드에 값 넣기 ==== //
      // ========================= //
      const maxId = slides.length > 0 ? Math.max(...slides.map((item) => item.id)) : 0;
      console.log("maxId", maxId + 1);
      addSlide({
        id: maxId + 1,
        file: file,
        previewPath: filePreview,
      });
    },
    [addSlide, slides]
  );

  // useDropzone 훅: 드롭존 속성 및 상태 가져오기
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
      "text/*": [".txt", ".csv"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        flex flex-col items-center
        border border-dashed 
        ${isDragActive ? "border-main-blue bg-main-blue text-white" : "border-gray-300 bg-dropzone-gray text-gray-600"}
        p-5 
        text-center 
        rounded-sm
        cursor-pointer 
        transition-colors duration-200
        !bg-brand-gray
      `}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>여기에 파일을 드롭하세요...</p>
      ) : (
        <>
          <h5 className="text-base text-primary font-bold">클릭하여 계약서를 등록</h5>
          <span className="text-color-secondary text-sm">이미지만 등록 할 수 있어요. (최대 6개)</span>
          <svg
            className="mt-2"
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 9H7V12H4V14H7V17H9V14H12V12H9V9ZM10 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6L10 0ZM14 18H2V2H9V7H14V18Z"
              fill="#323232"
            ></path>
          </svg>
        </>
      )}
    </div>
  );
};

export default Dropzone;
