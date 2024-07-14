import { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  Drawer,
  AutoComplete,
  Button,
  Card,
  Space,
  Typography,
  Divider,
  Form,
  Tooltip,
  message,
  Popconfirm,
} from "antd";
import ProductForm from "./AddProduct";

const Items = ({ items }) => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Action",
      width: 200,
      // dataIndex: "size",
      // key: "size",
      render: (record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <Tooltip title="Edit">
            <Button
              type="primary"
              onClick={() => handleEditForm(record)}
              icon={<i className="fa-solid fa-pen"></i>}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete the product ?"
              onConfirm={() => handleDeleteProduct(record)}
            >
              <Button
                type="primary"
                style={{
                  backgroundColor: "#d41528",
                  color: "white",
                }}
                icon={<i className="fa-solid fa-trash"></i>}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

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

          <AutoComplete
            style={{ width: 350, marginBottom: "10px" }}
            placeholder="Search Products by name"
            onChange={handleSearch}
            allowClear={true}
          />
        </Space>
        <Table
          rowKey="id"
          dataSource={searchText ? filteredProducts : products}
          pagination={{ pageSize: 10, position: ["bottomCenter"] }}
          scroll={{ y: 240 }}
          columns={columns}
        ></Table>
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
