import Image from "next/image";

interface RoundSectionLabelProps {
  text: string;
  alt: string;
  classnames?: string;
}
const RoundSectionLabel: React.FC<RoundSectionLabelProps> = ({ text, alt, classnames }) => {
  return (
    <div className={classnames}>
      <Image src={"/images/note_icon.svg"} alt={alt} width={13} height={15} className="inline-block align-middle" />
      <h3 className="text-section-h3 text-black font-semibold inline-block align-middle ml-[5px]">{text}</h3>
    </div>
  );
};

export default RoundSectionLabel;
