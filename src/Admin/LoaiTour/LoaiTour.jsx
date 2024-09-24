import React, { useState } from "react";
import { Table, Tooltip, Button, ConfigProvider, Space, message } from "antd";
import {
  AntDesignOutlined,
  DeleteOutlined,
  HighlightTwoTone,
} from "@ant-design/icons";
import TimKiem from "./TimKiem_LoaiTour"; // Kiểm tra tệp này
import ThemPhanQuyen from "./ThemLoaiTour"; // Kiểm tra
import CapNhatPhanQuyen from "./CapNhatLoaiTour"; // Kiểm tra

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
    title: "Loại Tour",
    dataIndex: "loaiTour",
    key: "loaiTour",
    ellipsis: {
      showTitle: false,
    },
    render: (loaiTour) => (
      <Tooltip placement="topLeft" title={loaiTour}>
        {loaiTour}
      </Tooltip>
    ),
  },
  {
    title: "Tên Tour",
    dataIndex: "tour",
    key: "tour",
    ellipsis: {
      showTitle: false,
    },
    render: (tour) => (
      <Tooltip placement="topLeft" title={tour}>
        {tour}
      </Tooltip>
    ),
  },
  {
    title: "Mô Tả",
    dataIndex: "moTa",
    key: "moTa",
    ellipsis: {
      showTitle: false,
    },
    render: (moTa) => (
      <Tooltip placement="topLeft" title={moTa}>
        {moTa}
      </Tooltip>
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
    loaiTour: "Tour nhiều ngày",
    tour: ["2 ngày một đêm", "3 ngày"],
    moTa: "cần thơ có chợ nổi",
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
      `Bạn có chắc chắn muốn xóa Tour này với ID: ${id}?`
    );
    if (confirmDelete) {
      message.success(`Đã xóa thành công: ${id}`); // Hiển thị thông báo
      // Logic xóa người dùng khỏi dữ liệu nếu cần
    }
  };

  return (
    <div className="container">
      <h3>Quản Lý Loại Tour</h3>

      {/* Nút "Thêm" */}
      <ConfigProvider>
        <Space>
          <Button
            className="loaitour-them"
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
            onClick={showModal}
          >
            Phân quyền cho loại Tour
          </Button>
        </Space>
        <ThemPhanQuyen visible={visible} onCancel={handleCancel} />
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
        <CapNhatPhanQuyen
          visible={visible}
          onCancel={handleCancel}
          user={editingUser} // Truyền dữ liệu người dùng vào modal
        />
      )}
    </div>
  );
};

export default App;
