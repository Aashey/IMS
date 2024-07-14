import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  Typography,
} from "antd";

const { Option } = Select;

const ProductForm = () => {
  const { Text } = Typography;

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<Text strong>Name</Text>}
            name="name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={<Text strong>Category</Text>}
            name="category"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Select placeholder="Select a category">
              <Option value="Clothing">Clothing</Option>
              <Option value="Footwear">Footwear</Option>
              <Option value="Accessories">Accessories</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<Text strong>Brand</Text>}
            name="brand"
            rules={[{ required: true, message: "Please input the brand!" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={<Text strong>Price</Text>}
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber prefix="Rs." style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label={<Text strong>Color</Text>} name="color">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={<Text strong>Size</Text>} name="size">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </>
  );
};

export default ProductForm;
