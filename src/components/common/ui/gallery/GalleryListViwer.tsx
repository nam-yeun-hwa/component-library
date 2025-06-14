import { FileType } from "@/app/(layoutCase)/pay/data";
import useSwiperStore from "@/store/common/useSwiperStore";
import { useEffect } from "react";

interface GalleryListVierProps {
  list: FileType[];
}

const GalleryListVier: React.FC<GalleryListVierProps> = ({ list }) => {
  const { setActiveSlideIndex, removeSlide, setActiveState } = useSwiperStore();

  const goToSlideById = (slideId) => {
    const slideIndex = list.findIndex((slide) => slide.id === slideId);
    console.log("slideIndex", slideIndex);
    if (slideIndex !== -1) {
      setActiveSlideIndex(slideIndex);
    }
  };

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <div>
      {list &&
        list.map((item) => {
          return (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 px-3 border-b border-gray-200 bg-white"
            >
              <button
                className="grow text-main-blue cursor-pointer underline text-left whitespace-nowrap overflow-hidden text-ellipsis"
                onClick={() => {
                  goToSlideById(item.id);
                  setActiveState(true);
                }}
              >
                {item.file.name}
              </button>
              <button
                className="text-red-500 cursor-pointer ml-2.5 text-sm order-1"
                onClick={() => removeSlide(item.id)}
              >
                삭제
              </button>
            </div>
          );
        })}
      <div className="flex justify-end">
        <span className="text-sm text-caption-gray text-right mt-1.5 font-normal">{list.length}/6 이미지</span>
      </div>
    </div>
  );
};

export default GalleryListVier;
