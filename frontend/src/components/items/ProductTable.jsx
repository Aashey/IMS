import { Table } from "antd";
import React from "react";
import ActionGroup from "../../common/Action";

const ProductTable = ({
  searchText,
  filteredProducts,
  products,
  onDelete,
  onEdit,
}) => {
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
        <ActionGroup onEdit={onEdit} onDelete={onDelete} record={record} />
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        dataSource={searchText ? filteredProducts : products}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
        scroll={{ y: 240 }}
        columns={columns}
      ></Table>
    </>
  );
};

export default ProductTable;
