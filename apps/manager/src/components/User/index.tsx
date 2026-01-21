import { LoginOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {};

const User: React.FC<Props> = ({ ...props }) => {
  return (
    <div {...props}>
      <Button variant="solid" color="primary" icon={<LoginOutlined />}>
        登录
      </Button>
    </div>
  );
};

export default User;
