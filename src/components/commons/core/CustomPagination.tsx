"use client";

import React from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

interface CustomPaginationProps extends PaginationProps {
  className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = (props) => {
  return (
    <div className={`flex justify-center items-center py-1 ${props.className || ""}`}>
      <Pagination
        {...props}
        showSizeChanger={false}
        itemRender={(page, type, originalElement) => {
          if (type === "prev") {
            return (
              <button className="custom-pagination-arrow">
                ←
              </button>
            );
          }
          if (type === "next") {
            return (
              <button className="custom-pagination-arrow">
                →
              </button>
            );
          }
          return originalElement;
        }}
        className="custom-pagination"
      />
    </div>
  );
};

export default CustomPagination;
