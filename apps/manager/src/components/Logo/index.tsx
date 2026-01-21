import { Image } from "antd";
import type { HTMLAttributes } from "react";
import logoSrc from "@/assets/logo-v4a.png";

type Props = HTMLAttributes<HTMLDivElement> & {};

const Logo: React.FC<Props> = ({ ...props }) => {
  return (
    <div {...props}>
      <Image className="image" src={logoSrc} />
      <div className="texts">
        <span>Modpack</span>
        <span>Manager</span>
      </div>
    </div>
  );
};

export default Logo;
