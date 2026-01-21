import { Checkbox, Flex } from "antd";
import type { CheckboxGroupProps } from "antd/lib/checkbox";

import fabricSvg from "@/assets/fabric.svg";
import forgeSvg from "@/assets/forge.svg";
import neoforgeSvg from "@/assets/neoforge.svg";
import quiltSvg from "@/assets/quilt.svg";
import { Loader } from "@/domains/loader";

type Props = CheckboxGroupProps<Loader> & {
  value: Readonly<Loader[]>;
  onChange: (value: Loader[]) => void;
};

const Loaders: React.FC<Props> = ({ ...props }) => {
  const options = [
    {
      value: Loader.Forge,
      label: (
        <Flex align="center" gap={8}>
          <img alt="forge" src={forgeSvg} width={16} height={16} />
          <span>Forge</span>
        </Flex>
      ),
    },
    {
      value: Loader.Fabric,
      label: (
        <Flex align="center" gap={8}>
          <img alt="fabric" src={fabricSvg} width={16} height={16} />
          <span>Fabric</span>
        </Flex>
      ),
    },
    {
      value: Loader.Quilt,
      label: (
        <Flex align="center" gap={8}>
          <img alt="quilt" src={quiltSvg} width={16} height={16} />
          <span>Quilt</span>
        </Flex>
      ),
    },
    {
      value: Loader.NeoForge,
      label: (
        <Flex align="center" gap={8}>
          <img alt="neoforge" src={neoforgeSvg} width={16} height={16} />
          <span>NeoForge</span>
        </Flex>
      ),
    },
  ];
  return (
    <Checkbox.Group
      {...props}
      options={options}
      defaultValue={[]}
      name="source"
      style={{ flexDirection: "column" }}
    />
  );
};

export default Loaders;
