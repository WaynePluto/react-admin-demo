import type {
  PermissionDetailResponse,
  CreatePermissionRequest,
  UpdatePermissionRequest,
} from "@/hono-api-type/modules/permission/model";
import type { ModalFormProps } from "@ant-design/pro-components";
import { ProForm, ProFormText, ProFormTextArea, ProFormRadio } from "@ant-design/pro-components";
import { isValidElement } from "react";

interface PermissionFormProps extends Omit<ModalFormProps, "onFinish"> {
  editingPermission?: PermissionDetailResponse;
  onFinish: (values: CreatePermissionRequest | UpdatePermissionRequest) => Promise<boolean>;
  onCancel?: () => void;
}

export function PermissionForm({ editingPermission, onFinish, title, onCancel, ...props }: PermissionFormProps) {
  const isEdit = !!editingPermission;

  // Ensure title is string or undefined
  const safeTitle: string | undefined =
    typeof title === "string" ? title : isValidElement(title) ? (title as any).props?.title : undefined;

  const handleFinish = async (values: CreatePermissionRequest | UpdatePermissionRequest) => {
    // 强制设置权限类型为"自定义权限"
    const valuesWithType = {
      ...values,
      type: "custom" as const,
    };
    return await onFinish(valuesWithType);
  };

  return (
    <ProForm
      {...props}
      title={safeTitle}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        ...editingPermission,
        type: "custom",
      }}
      submitter={{
        searchConfig: {
          submitText: isEdit ? "更新" : "创建",
          resetText: "重置",
        },
        resetButtonProps: {
          onClick: onCancel,
        },
        submitButtonProps: {
          id: "permission-form-submit",
        },
      }}
    >
      <ProFormText
        name="name"
        label="权限名称"
        placeholder="请输入权限名称"
        rules={[{ required: true, message: "请输入权限名称" }]}
        fieldProps={{
          id: "permission-form-name",
          maxLength: 50,
        }}
      />
      <ProFormText
        name="code"
        label="权限编码"
        placeholder="请输入权限编码"
        rules={[{ required: true, message: "请输入权限编码" }]}
        fieldProps={{
          id: "permission-form-code",
          maxLength: 100,
        }}
      />
      <ProFormRadio.Group
        name="type"
        label="权限类型"
        initialValue="custom"
        disabled
        options={[
          {
            label: "系统权限",
            value: "system",
          },
          {
            label: "自定义权限",
            value: "custom",
          },
        ]}
        radioType="button"
      />
      <ProFormTextArea
        name="description"
        label="描述"
        placeholder="请输入权限描述"
        fieldProps={{
          id: "permission-form-description",
          rows: 3,
          maxLength: 200,
        }}
      />
    </ProForm>
  );
}
