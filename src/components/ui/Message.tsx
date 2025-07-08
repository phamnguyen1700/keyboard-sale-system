import { message as antdMessage } from "antd";

export const message = (
  type: "success" | "error" | "info" | "warning",
  content: string
) => {
  antdMessage[type](content);
};