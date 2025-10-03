import { templateClient } from "@/api/template";
import { message } from "antd";
import type {
  TemplateDetailResponse,
  CreateTemplateRequest,
  UpdateTemplateRequest,
} from "@/hono-app-type/modules/template/model";

export const useTemplate = () => {
  const fetchTemplates = async (params: {
    page: number;
    pageSize: number;
    name?: string;
    orderBy?: "created_at" | "updated_at";
    order?: "asc" | "desc";
  }) => {
    try {
      const res = await templateClient.page.$post({
        json: params,
      });

      if (res.ok) {
        const json = await res.json();
        return json.data;
      } else {
        message.error("获取模板列表失败");
        return { total: 0, list: [] };
      }
    } catch (error) {
      message.error("获取模板列表失败: " + (error as Error).message);
      return { total: 0, list: [] };
    }
  };

  const createTemplate = async (data: CreateTemplateRequest) => {
    try {
      const res = await templateClient.index.$post({
        json: data,
      });

      if (res.ok) {
        const result = await res.json();
        message.success("创建模板成功");
        return true;
      } else {
        message.error("创建模板失败");
        return false;
      }
    } catch (error) {
      message.error("创建模板失败: " + (error as Error).message);
      return false;
    }
  };

  const updateTemplate = async (id: string, data: UpdateTemplateRequest) => {
    try {
      const res = await templateClient[":id"].$put({
        param: { id },
        json: data,
      });

      if (res.ok) {
        message.success("更新模板成功");
        return true;
      } else {
        message.error("更新模板失败");
        return false;
      }
    } catch (error) {
      message.error("更新模板失败: " + (error as Error).message);
      return false;
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const res = await templateClient[":id"].$delete({
        param: { id },
      });

      if (res.ok) {
        message.success("删除模板成功");
        return true;
      } else {
        message.error("删除模板失败");
        return false;
      }
    } catch (error) {
      console.log("🚀 ~ deleteTemplate ~ error:", error);
      message.error("删除模板失败: " + (error as Error).message);
      return false;
    }
  };

  return {
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
};
