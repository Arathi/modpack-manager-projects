import { Checkbox, Flex } from "antd";
import type { CheckboxGroupProps } from "antd/lib/checkbox";
import { FaComputer, FaServer } from "react-icons/fa6";
import { Environment } from "@/domains/environment";

type Props = CheckboxGroupProps<Environment> & {
  value: Environment[];
  onChange: (value: Environment[]) => void;
};

const Environments: React.FC<Props> = ({ ...props }) => {
  const options = [
    {
      value: Environment.Client,
      label: (
        <Flex align="center" gap={8}>
          <FaComputer />
          <span>客户端</span>
        </Flex>
      ),
    },
    {
      value: Environment.Server,
      label: (
        <Flex align="center" gap={8}>
          <FaServer />
          <span>服务端</span>
        </Flex>
      ),
    },
  ];
  return (
    <Checkbox.Group
      {...props}
      options={options}
      defaultValue={[]}
      name="environments"
      style={{ flexDirection: "column" }}
    />
  );
};

export default Environments;
