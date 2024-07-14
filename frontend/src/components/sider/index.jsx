import { Layout, Menu } from "antd";
import { useState } from "react";

const Sider = ({ onMenuSelect }) => {
  const { Sider: AntdSider } = Layout;
  const [isCollapsed, setisCollapsed] = useState(false);

  const menuItems = ["Dashboard", "Items", "Stock", "Purchase", "Sales"].map(
    (key) => ({
      key: key,
      label: key,
    })
  );
  return (
    <AntdSider
      collapsible
      collapsed={isCollapsed}
      onCollapse={(value) => setisCollapsed(value)}
      theme="light"
      width={200}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        items={menuItems}
        onClick={({ key }) => onMenuSelect(key)}
      />
    </AntdSider>
  );
};

export default Sider;
