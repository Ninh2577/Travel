import React, { useState } from "react";
import { Table, Tooltip, Button, ConfigProvider, Space, message } from "antd";
import {
  AntDesignOutlined,
  DeleteOutlined,
  HighlightTwoTone,
} from "@ant-design/icons";
import TimKiem from "./TimKiem_NguoiDung.jsx";
import "./Css/NhanVien.css";
import ThemKhachHang from "./ThemKhachHang.jsx";
import CapNhatKhachHang from "./CapNhatKhachHang.jsx";

// Cột dữ liệu của bảng
const columns = (showEditModal, handleDelete) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => (
      <a href="#!" onClick={(e) => e.preventDefault()}>
        {text}
      </a>
    ),
    width: 50,
  },
  {
    title: "Họ & Tên ",
    dataIndex: "ten",
    key: "ten",
    ellipsis: {
      showTitle: false,
    },
    render: (ten) => (
      <Tooltip placement="topLeft" title={ten}>
        {ten}
      </Tooltip>
    ),
  },
  {
    title: "Tuổi",
    dataIndex: "tuoi",
    key: "tuoi",
    render: (text) => (
      <a href="#!" onClick={(e) => e.preventDefault()}>
        {text}
      </a>
    ),
    width: 100,
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    ellipsis: {
      showTitle: false,
    },
    render: (email) => (
      <Tooltip placement="topLeft" title={email}>
        {email}
      </Tooltip>
    ),
  },
  {
    title: "Địa chỉ",
    dataIndex: "diachi",
    key: "diachi",
    ellipsis: {
      showTitle: false,
    },
    render: (diachi) => (
      <Tooltip placement="topLeft" title={diachi}>
        {diachi}
      </Tooltip>
    ),
  },
  {
    title: "Giới Tính",
    dataIndex: "gioiTinh",
    key: "gioiTinh",
    ellipsis: {
      showTitle: false,
    },
    render: (gioiTinh) => (
      <Tooltip placement="topLeft" title={gioiTinh}>
        {gioiTinh}
      </Tooltip>
    ),
  },
  {
    title: "Ảnh",
    dataIndex: "anh",
    key: "anh",
    render: (anh) => (
      <img src={anh} alt="Profile" style={{ width: 50, height: 50 }} />
    ),
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* Nút Sửa */}
        <Button
          icon={<HighlightTwoTone />}
          onClick={() => showEditModal(record)} // Hiển thị modal với dữ liệu người dùng được chọn
        ></Button>

        {/* Nút Xóa */}
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDelete(record.id)} // Gọi hàm xóa
        ></Button>
      </Space>
    ),
  },
];

// Dữ liệu mẫu
const data = [
  {
    id: "1",
    ten: "John Brown",
    tuoi: 32,
    phone: "123-456-7890",
    email: "nguyenvana@gmail.com",
    diachi: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    gioiTinh: "Nam",
    anh: "https://tse2.mm.bing.net/th?id=OIP.vPGgc4SKt1K93o4ogYizSwHaFj&pid=Api&P=0&h=220", // Example image URL
  },
];

// Component chính
const App = () => {
  const [visible, setVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Trạng thái người dùng đang chỉnh sửa

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingUser(null); // Reset trạng thái người dùng sau khi đóng modal
  };

  const showEditModal = (user) => {
    setEditingUser(user); // Đặt người dùng đang được chỉnh sửa
    setVisible(true); // Mở modal
  };

  // Hàm xử lý xóa và hiển thị thông báo
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa người dùng với ID: ${id}?`
    );
    if (confirmDelete) {
      message.success(`Đã xóa thành công: ${id}`); // Hiển thị thông báo
      // Logic xóa người dùng khỏi dữ liệu nếu cần
    }
  };

  return (
    <div className="container">
      <h3>Danh Sách Khách Hàng</h3>

      {/* Nút "Thêm" */}
      <ConfigProvider>
        <Space>
          <Button
            className="khachhang-them"
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
            onClick={showModal}
          >
            Thêm
          </Button>
        </Space>
        <ThemKhachHang visible={visible} onCancel={handleCancel} />
      </ConfigProvider>

      {/* Tìm kiếm người dùng */}
      <TimKiem />

      {/* Bảng người dùng */}
      <div
        className="table-container align-items-center"
        style={{ marginRight: "-100px" }}
      >
        <Table
          columns={columns(showEditModal, handleDelete)}
          dataSource={data}
        />
      </div>

      {/* Modal cập nhật người dùng */}
      {editingUser && (
        <CapNhatKhachHang
          visible={visible}
          onCancel={handleCancel}
          user={editingUser} // Truyền dữ liệu người dùng vào modal
        />
      )}
    </div>
  );
};

export default App;
