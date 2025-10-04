import type {
  RoleDetailResponse,
  CreateRoleRequest,
  UpdateRoleRequest,
} from "@/hono-api-type/modules/role/model";
import type { ModalFormProps } from "@ant-design/pro-components";
import { ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { isValidElement } from "react";

interface RoleFormProps extends Omit<ModalFormProps, "onFinish"> {
  editingRole?: RoleDetailResponse;
  onFinish: (values: CreateRoleRequest | UpdateRoleRequest) => Promise<boolean>;
  onCancel?: () => void;
}

export function RoleForm({ editingRole, onFinish, title, onCancel, ...props }: RoleFormProps) {
  const isEdit = !!editingRole;

  // Ensure title is string or undefined
  const safeTitle: string | undefined =
    typeof title === "string" ? title : isValidElement(title) ? (title as any).props?.title : undefined;

  const handleFinish = async (values: CreateRoleRequest | UpdateRoleRequest) => {
    return await onFinish(values);
  };

  return (
    <ProForm
      {...props}
      title={safeTitle}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={editingRole}
      submitter={{
        searchConfig: {
          submitText: isEdit ? "更新" : "创建",
          resetText: "重置",
        },
        resetButtonProps: {
          onClick: onCancel,
        },
        submitButtonProps: {
          id: "role-form-submit",
        },
      }}
    >
      <ProFormText
        name="name"
        label="角色名称"
        placeholder="请输入角色名称"
        rules={[{ required: true, message: "请输入角色名称" }]}
        fieldProps={{
          id: "role-form-name",
          maxLength: 50,
        }}
      />
      <ProFormText
        name="code"
        label="角色编码"
        placeholder="请输入角色编码"
        rules={[{ required: true, message: "请输入角色编码" }]}
        fieldProps={{
          id: "role-form-code",
          maxLength: 50,
        }}
      />
      <ProFormTextArea
        name="description"
        label="角色描述"
        placeholder="请输入角色描述"
        fieldProps={{
          id: "role-form-description",
          rows: 3,
          maxLength: 200,
        }}
      />
    </ProForm>
  );
}