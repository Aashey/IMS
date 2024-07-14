import React from "react";
import { Tooltip, Popconfirm, Button } from "antd";

const ActionGroup = ({ onEdit, onDelete, record }) => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Tooltip title="Edit">
        <Button
          type="primary"
          onClick={() => onEdit(record)}
          icon={<i className="fa-solid fa-pen"></i>}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <Popconfirm
          title="Delete the product ?"
          onConfirm={() => onDelete(record)}
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
  );
};

export default ActionGroup;
