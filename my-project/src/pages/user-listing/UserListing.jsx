import {
  Button,
  Input,
  Table,
  Drawer,
  Avatar,
  Tooltip,
  Checkbox,
  Dropdown,
  Menu,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Userlisting = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [drawerData, setDrawerData] = useState([]);
  const [drawerIndex, setDrawerIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        const initialData = response.data.users.slice(0, 10);
        setData(initialData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const avatarUrls = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/15.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/8.jpg",
    "https://randomuser.me/api/portraits/women/9.jpg",
    "https://randomuser.me/api/portraits/men/10.jpg",
    "https://randomuser.me/api/portraits/women/11.jpg",
  ];

  const getAvatarUrl = (index) => avatarUrls[index];

  const sortData = (order) => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`;
      const nameB = `${b.firstName} ${b.lastName}`;
      if (order === "asc") return nameA.localeCompare(nameB);
      if (order === "desc") return nameB.localeCompare(nameA);
      return 0;
    });
    setData(sortedData);
  };

  const handleFilterSubmit = () => {
    sortData(sortOrder);
    setFilterVisible(false);
  };

  const handleFilterReset = () => {
    setSortOrder(null);
    setFilterVisible(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
  };

  const filteredData = data.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchText);
  });

  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (_, __, index) => (
        <Avatar src={getAvatarUrl(index)} shape="circle" size={70} />
      ),
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (_, data) => `${data.firstName} ${data.lastName}`,
    },
    {
      title: "PHONE NO.",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (_, data) => data.company.title,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      render: (_, data) =>
        `${data.address.address}, ${data.address.city}, ${data.address.postalCode}`,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <Tooltip title="More details">
          <MoreOutlined className="text-gray-500 cursor-pointer text-center justify-center items-center hover:text-gray-700" />
        </Tooltip>
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    navigate("/Login");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Checkbox
          checked={sortOrder === "asc"}
          onChange={() => setSortOrder("asc")}
        >
          Ascending
        </Checkbox>
      </Menu.Item>
      <Menu.Item>
        <Checkbox
          checked={sortOrder === "desc"}
          onChange={() => setSortOrder("desc")}
        >
          Descending
        </Checkbox>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={handleFilterReset}>Reset</Button>
        <Button onClick={handleFilterSubmit}>Submit</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <section className="bg-gray-100 w-full h-full flex flex-col lg:flex-row">
      <div className="bg-white shadow-lg lg:w-[4%] lg:min-h-screen lg:flex flex-col !items-center py-5 px-2 lg:py-8 lg:px-4 lg:justify-between hidden">
        <div className="flex flex-row lg:flex-col lg:items-center lg:space-y-5 lg:space-x-0 space-x-4">
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
      </div>
      <div className="flex-grow p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between mb-6">
          <div className="flex flex-col">
            <h1 className="text-gray-400 font-sans text-2xl mb-2 lg:mb-0">
              Users
            </h1>
            <p className="text-gray-400 font-serif text-sm">
              Here are all the users for this project.
            </p>
          </div>
          <Button
            className="text-xs font-bold mt-4 lg:mt-0 lg:ml-auto !border-violet-800 !text-violet-800 hover:!bg-violet-800 hover:!text-white"
            ghost
          >
            <span className="text-xl pb-1">+</span> Add User
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center mb-6">
          <Input
            className="!w-full lg:!w-[270px] shadow-md text-gray-500 rounded-3xl mb-4 lg:mb-0 lg:me-4"
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
          />

          <Dropdown
            overlay={menu}
            trigger={["click"]}
            visible={filterVisible}
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <a className="text-gray-500 text-sm flex items-center cursor-pointer">
              <FilterOutlined className="me-1" /> Filter
            </a>
          </Dropdown>
        </div>
        <div className="overflow-x-auto">
          <Table
            className="w-full"
            columns={columns}
            dataSource={filteredData}
            onRow={(record, rowIndex) => ({
              onClick: () => {
                setOpen(true);
                setDrawerData(record);
                setDrawerIndex(rowIndex);
              },
            })}
            loading={loading}
            rowKey="id"
            pagination={false}
            scroll={{
              x: 800,
              y: 500,
            }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-3 pb-2">
          Showing {(page - 1) * pageSize + 1}-
          {Math.min(page * pageSize, filteredData.length)} of{" "}
          {filteredData.length} Users
        </p>
      </div>
      <Drawer
        className="rounded h-screen"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        closeIcon={null}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 font-semibold text-lg">User Details</p>
          <MoreOutlined
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => setOpen(false)}
          />
        </div>
        {drawerData && (
          <div>
            <div className="flex items-center mb-4">
              <Avatar
                src={getAvatarUrl(drawerIndex)}
                shape="circle"
                size={100}
                className="mr-4"
              />
              <div className="flex flex-col">
                <p className="text-xl font-semibold mb-1">
                  {`${drawerData?.firstName} ${drawerData?.lastName}`}
                </p>
                <p className="text-sm text-gray-500">
                  Birthdate: {drawerData?.birthDate}
                </p>
              </div>
            </div>
            <hr className="my-4 border-gray-300" />

            <div>
              <div className="flex items-center mb-4">
                <UserOutlined className="text-xl text-gray-500 mr-2" />
                <h1 className="text-xl text-gray-500">Account Details</h1>
              </div>
              <p className="text-lg text-gray-500 font-semibold">
                {`${drawerData?.firstName} ${drawerData?.lastName}`}
              </p>
              <p className="text-xs text-gray-300">FULL NAME</p>
              <p className="text-lg text-gray-500 font-semibold">
                {drawerData?.email}
              </p>
              <p className="text-xs text-gray-300">EMAIL</p>
              <p className="text-lg text-gray-500 font-semibold">
                {drawerData?.company?.title}
              </p>
              <p className="text-xs text-gray-300">COMPANY</p>
            </div>

            <hr className="my-4 border-gray-300" />

            <div>
              <div className="flex items-center mb-4">
                <BarChartOutlined className="text-xl text-gray-500 mr-2" />
                <h1 className="text-xl text-gray-500">User Data</h1>
              </div>
              <p className="text-lg text-gray-500 font-semibold">
                {drawerData?.address?.address}
              </p>
              <p className="text-xs text-gray-300">ADDRESS</p>
              <p className="text-lg text-gray-500 font-semibold">{`${drawerData?.address?.city} - ${drawerData?.address?.postalCode}`}</p>
              <p className="text-xs text-gray-300">CITY</p>
              <p className="text-lg text-gray-500 font-semibold">
                {drawerData?.address?.country}
              </p>
              <p className="text-xs text-gray-300">COUNTRY</p>
            </div>
          </div>
        )}
      </Drawer>
    </section>
  );
};

export default Userlisting;
