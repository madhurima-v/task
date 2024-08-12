import React from "react";
import { Layout, Avatar, Tooltip, Button } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    navigate("/Login");
  };

  return (
    <Layout className="min-h-screen">
      <div className="flex w-full">
        {/* Sidebar for larger screens */}
        <Sider
          className="shadow-lg hidden lg:flex lg:flex-col lg:justify-between lg:min-h-screen"
          width={80}
          style={{ backgroundColor: "white" }}
        >
          <div className="text-center my-4">
            <Avatar
              size={64}
              src="https://randomuser.me/api/portraits/men/1.jpg"
              className="border-4 border-white"
            />
            <h2 className="text-gray-800 font-bold mt-2">Admin</h2>
          </div>
          <div className="flex flex-col items-center space-y-5">
            <Tooltip title="Dashboard">
              <Button
                type="text"
                icon={
                  <DashboardOutlined className="text-violet-800 text-2xl" />
                }
                onClick={() => navigate("/Dashboard")}
              />
            </Tooltip>
            <Tooltip title="User Data">
              <Button
                type="text"
                icon={<UserOutlined className="text-violet-800 text-2xl" />}
                onClick={() => navigate("/Userlisting")}
              />
            </Tooltip>
            <Tooltip title="Logout">
              <Button
                type="text"
                icon={<LogoutOutlined className="text-violet-800 text-2xl" />}
                onClick={handleLogout}
              />
            </Tooltip>
          </div>
        </Sider>

        <Layout className="flex-grow">
          <Header className="bg-white w-full shadow-md flex items-center px-6">
            <h1 className="text-violet-800 text-2xl font-bold w-full text-center">
              Dashboard
            </h1>
          </Header>
          <Content className="m-4 p-4 bg-gray-100 rounded-lg shadow-md">
            Hello World
          </Content>
        </Layout>
      </div>

      {/* Bottom navigation for mobile view */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around py-2">
        <Tooltip title="Dashboard">
          <Button
            type="text"
            icon={<DashboardOutlined className="text-violet-800 text-2xl" />}
            onClick={() => navigate("/Dashboard")}
          />
        </Tooltip>
        <Tooltip title="User Data">
          <Button
            type="text"
            icon={<UserOutlined className="text-violet-800 text-2xl" />}
            onClick={() => navigate("/Userlisting")}
          />
        </Tooltip>
        <Tooltip title="Logout">
          <Button
            type="text"
            icon={<LogoutOutlined className="text-violet-800 text-2xl" />}
            onClick={handleLogout}
          />
        </Tooltip>
      </div>
    </Layout>
  );
};

export default Dashboard;
