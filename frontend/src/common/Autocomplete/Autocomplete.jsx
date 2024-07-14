import React from "react";
import { AutoComplete } from "antd";

const CustomAutocomplete = ({ handleSearch }) => {
  return (
    <>
      <AutoComplete
        style={{ width: 350, marginBottom: "10px" }}
        placeholder="Search Here"
        onChange={handleSearch}
        allowClear={true}
      />
    </>
  );
};

export default CustomAutocomplete;
