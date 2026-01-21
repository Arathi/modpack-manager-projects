import { App, ConfigProvider } from "antd";
import zh_CN from "antd/locale/zh_CN";
import { RouterProvider } from "react-router";
import router from "./router";

const Entry = () => {
  return (
    <ConfigProvider locale={zh_CN}>
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  );
};

export default Entry;
