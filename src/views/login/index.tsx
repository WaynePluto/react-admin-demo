import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import { authClient } from "@/api/auth";
import { setToken, setRefreshToken } from "@/utils/auth";
import { message } from "antd";
import { MD5 } from "crypto-js";

export function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      const res = await authClient.login.$post({
        json: {
          username: values.username,
          password: MD5(values.password).toString(),
        },
      });

      const data = await res.json();

      if (data.code === 200 && data.data.token) {
        setToken(data.data.token);
        setRefreshToken(data.data.refresh_token);
        messageApi.success("登录成功！");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        messageApi.error(data.msg || "登录失败，请重试！");
      }
    } catch (error) {
      console.error("Login error:", error);
      messageApi.error("登录失败，请检查网络连接！");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {contextHolder}
      <div className="w-full max-w-400px">
        <LoginForm
          title="后台管理系统"
          subTitle="欢迎登录"
          onFinish={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className="text-gray-400" />,
            }}
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: "用户名是必填项！",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className="text-gray-400" />,
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: "密码是必填项！",
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
}
