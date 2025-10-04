import { templateClient } from "@/api/template";
import type { CreateTemplateRequest, TemplateDetailResponse, UpdateTemplateRequest } from "@/hono-api-type/modules/template/model";
import { message } from "antd";

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

      const json = await res.json();
      if (json.code === 200) {
        return json.data;
      } else {
        message.error(json.msg || "获取模板列表失败");
        return { total: 0, list: [] };
      }
    } catch (error) {
      message.error("获取模板列表失败: " + (error as Error).message);
      return { total: 0, list: [] };
    }
  };

  const fetchTemplateDetail = async (id: string) => {
    try {
      const res = await templateClient[":id"].$get({
        param: { id },
      });

      const json = await res.json();
      if (json.code === 200) {
        return json.data;
      } else {
        message.error(json.msg || "获取模板详情失败");
        return null;
      }
    } catch (error) {
      message.error("获取模板详情失败: " + (error as Error).message);
      return null;
    }
  };

  const createTemplate = async (data: CreateTemplateRequest) => {
    try {
      const res = await templateClient.index.$post({
        json: data,
      });

      const result = await res.json();
      if (result.code === 200) {
        message.success(result.msg || "创建模板成功");
        return true;
      } else {
        message.error(result.msg || "创建模板失败");
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

      const result = await res.json();
      if (result.code === 200) {
        message.success(result.msg || "更新模板成功");
        return true;
      } else {
        message.error(result.msg || "更新模板失败");
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
      const json = await res.json();
      if (json.code === 200) {
        message.success(json.msg ?? "删除模板成功");
        return true;
      } else {
        message.error(json.msg ?? "删除模板失败");
        return false;
      }
    } catch (error) {
      message.error("删除模板失败: " + (error as Error).message);
      return false;
    }
  };

  return {
    fetchTemplates,
    fetchTemplateDetail,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
};
