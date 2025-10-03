import { roleClient } from "@/api/role";
import type { RoleDetailResponse } from "@/hono-api-type/modules/role/model";
import { message } from "antd";
import { useCallback, useEffect, useState } from "react";

export function useRole() {
  const [roleMap, setRoleMap] = useState<Record<string, { text: string; color: string }>>({});
  const [roles, setRoles] = useState<RoleDetailResponse[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取角色数据
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await roleClient.page.$post({
        json: {
          page: 1,
          pageSize: 100, // 获取所有角色
        },
      });

      const json = await res.json();
      if (json.code === 200) {
        // 创建颜色映射，为不同角色分配不同颜色
        const colors = ["red", "blue", "green", "orange", "purple", "cyan", "magenta", "gold", "lime"];

        // 设置角色列表
        const validRoles = json.data.list.filter((role: any) => role.code && role.name);
        setRoles(validRoles as RoleDetailResponse[]);

        // 构造新的roleMap对象
        const newRoleMap: Record<string, { text: string; color: string }> = {};
        validRoles.forEach((role: any, index: number) => {
          newRoleMap[role.code] = {
            text: role.name,
            color: colors[index % colors.length],
          };
        });

        setRoleMap(newRoleMap);
      } else {
        message.error(json.msg || "获取角色列表失败");
      }
    } catch (error) {
      message.error("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    roleMap,
    roles,
    loading,
    fetchRoles,
  };
}
