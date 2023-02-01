import { Tooltip, Image } from "@chakra-ui/react";

type HelperImageProps = {
  label?: string;
  src: string;
  size: number;
};

const HelperImage = ({ label, src, size }: HelperImageProps) => {
  return (
    <Tooltip hasArrow aria-label={label} label={label} placement="auto-end">
      <Image src={src} alt={label} title={label} height={size} width={size} />
    </Tooltip>
  );
};

HelperImage.defaultProps = {
  label: "",
};

export default HelperImage;
