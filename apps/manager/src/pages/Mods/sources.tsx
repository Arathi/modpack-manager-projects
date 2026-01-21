import { Flex, Segmented, type SegmentedProps } from "antd";
import { SiCurseforge, SiModrinth } from "react-icons/si";
import { Source } from "@/domains/source";

type Props = SegmentedProps<Source>;

const Sources: React.FC<Props> = ({ ...props }) => {
  const options: Props["options"] = [
    {
      value: Source.CurseForge,
      label: (
        <Flex justify="center" align="center" gap={8}>
          <SiCurseforge />
          <span>CurseForge</span>
        </Flex>
      ),
    },
    {
      value: Source.Modrinth,
      label: (
        <Flex justify="center" align="center" gap={8}>
          <SiModrinth />
          <span>Modrinth</span>
        </Flex>
      ),
    },
  ];

  return (
    <Segmented
      {...props}
      block
      options={options}
      defaultValue={Source.CurseForge}
    />
  );
};

export default Sources;
