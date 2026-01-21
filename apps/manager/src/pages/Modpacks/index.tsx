import { Flex, Table } from "antd";

const Page = () => {
  return (
    <Flex vertical style={{ width: "100%" }}>
      <div>整合包管理</div>
      <Table pagination={false} />
    </Flex>
  );
};

export default Page;
