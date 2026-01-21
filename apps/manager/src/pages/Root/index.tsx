import { SettingOutlined } from "@ant-design/icons";
import { Outlet } from "react-router";

import Logo from "@/components/Logo";
import NavigatorBar from "@/components/NavigatorBar";
import User from "@/components/User";

import "./index.less";
import { Button } from "antd";

const Page = () => {
  return (
    <div className="root">
      <div className="header">
        <Logo className="logo" />
        <NavigatorBar className="navigator-bar" />
        <User className="user" />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Page;
