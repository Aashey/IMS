import { useEffect, useState } from "react";
import axios from "axios";

import {
  Drawer,
  Button,
  Card,
  Space,
  // Typography,
  // Divider,
  Form,
  message,
} from "antd";
import ProductForm from "./AddProduct";
import ProductTable from "./ProductTable";
import CustomAutocomplete from "../../common/Autocomplete";

const Items = () => {
  // const { Title } = Typography;
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleDeleteProduct = async (record) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/products/${record.id}`
      );
      setProducts(products.filter((product) => product.id !== record.id));
      message.success(response.data.message);
    } catch (error) {
      message.error(error);
      console.log("Error Deleting the product", error);
    }
  };

  const handleEditForm = (record) => {
    setFormMode("edit");
    setSelectedRecord(record);
    openDrawer();
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredItem = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filteredItem);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    form.resetFields();
    setDrawerOpen(false);
    setSelectedRecord(null);
    setTimeout(() => {
      setFormMode(null);
    }, [1000]);
  };

  const onFinish = async (values) => {
    if (formMode === "create") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/products",
          values
        );
        setProducts([...products, response.data.product]);
        message.success(response.data.message);
      } catch (error) {
        message.error(error);
      }
    } else if (formMode === "edit" && selectedRecord) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/products/${selectedRecord.id}`,
          values
        );
        const updatedProduct = {
          ...response.data.updatedProduct,
          id: selectedRecord.id,
        };
        const updatedProducts = products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        console.log(response);
        message.success(response.data.message);
      } catch (error) {
        message.error(error);
      }
    }
    closeDrawer();
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log("Error Fetching API", error);
    }
  };

  useEffect(() => {
    formMode === "edit"
      ? form.setFieldsValue(selectedRecord)
      : form.resetFields();
  }, [formMode, selectedRecord, form]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Card title="Products">
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            style={{ marginBottom: "10px" }}
            onClick={() => {
              setFormMode("create");
              openDrawer();
            }}
            type="primary"
          >
            Add Item
          </Button>
          <CustomAutocomplete handleSearch={handleSearch} />
        </Space>
        <ProductTable
          searchText={searchText}
          filteredProducts={filteredProducts}
          products={products}
          onDelete={handleDeleteProduct}
          onEdit={handleEditForm}
        />
      </Card>

      <Drawer
        title={`${formMode?.toUpperCase()} PRODUCT`}
        width={900}
        open={drawerOpen}
        onClose={closeDrawer}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <ProductForm formMode={formMode} />
        </Form>
      </Drawer>
    </>
  );
};
// id, name, category, brand, price, color, size,

export default Items;
