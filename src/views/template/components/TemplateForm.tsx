import { Form, Input, Button, Space } from "antd";
import type { FormInstance } from "antd";
import type { TemplateDetailResponse } from "@/hono-app-type/modules/template/model";
import { useEffect, useRef } from "react";

interface TemplateFormProps {
  editingTemplate?: TemplateDetailResponse;
  onFinish: (values: any) => Promise<boolean | void>;
  onCancel?: () => void;
}

export function TemplateForm({ editingTemplate, onFinish, onCancel }: TemplateFormProps) {
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(null);

  useEffect(() => {
    if (editingTemplate && formRef.current) {
      formRef.current.setFieldsValue({
        name: editingTemplate.name,
      });
    } else if (formRef.current) {
      formRef.current.resetFields();
    }
  }, [editingTemplate]);

  return (
    <Form
      form={form}
      ref={formRef}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="模板名称"
        name="name"
        rules={[{ required: true, message: "请输入模板名称!" }]}
      >
        <Input placeholder="请输入模板名称" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {editingTemplate ? "更新" : "创建"}
          </Button>
          <Button htmlType="button" onClick={onCancel}>
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}