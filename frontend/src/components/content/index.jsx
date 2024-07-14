import { Layout } from "antd";
import Dashboard from "../dashboard";
import Items from "../items";
import Stock from "../stock";
import PurchaseItems from "../purchase";
import SalesItem from "../sales";

const PageContent = ({ selectedItem }) => {
  const { Content } = Layout;
  const selectedSiderItem = selectedItem;

  const renderContent = (selectedSiderItem) => {
    switch (selectedSiderItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Items":
        return <Items />;
      case "Stock":
        return <Stock />;
      case "Purchase":
        return <PurchaseItems />;
      case "Sales":
        return <SalesItem />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div>
      <Content style={{ padding: "20px", margin: 0, minHeight: 280 }}>
        {renderContent(selectedSiderItem)}
      </Content>
    </div>
  );
};

export default PageContent;
