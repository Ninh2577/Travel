import React, { useState } from "react";
import { Table, Tooltip, Button, ConfigProvider, Space, message } from "antd";
import {
  AntDesignOutlined,
  DeleteOutlined,
  HighlightTwoTone,
} from "@ant-design/icons";
import TimKiem from "./TimKiem_NguoiDung.jsx";
import ThemLichTrinhTour from "./ThemLichTrinhTour.jsx";
import CapNhatLichTrinhTour from "./CapNhatLichTrinhTour.jsx";

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
    title: "Tên Tour",
    dataIndex: "tenTour",
    key: "tenTour",
    ellipsis: {
      showTitle: false,
    },
    render: (tenTour) => (
      <Tooltip placement="topLeft" title={tenTour}>
        {tenTour}
      </Tooltip>
    ),
  },
  {
    title: "Tiêu Đề",
    dataIndex: "tieuDe",
    key: "tieuDe",
    ellipsis: {
      showTitle: false,
    },
    render: (tieuDe) => (
      <Tooltip placement="topLeft" title={tieuDe}>
        {tieuDe}
      </Tooltip>
    ),
  },
  {
    title: "Ngày",
    dataIndex: "ngay",
    key: "ngay",
    width: 150,
  },
  {
    title: "Nội Dung",
    dataIndex: "noiDung",
    key: "noiDung",
    ellipsis: {
      showTitle: false,
    },
    render: (noiDung) => (
      <Tooltip placement="topLeft" title={noiDung}>
        {noiDung}
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
    tenTour: "Gia Đình",
    tieuDe: "Tour 3 ngày 2 đêm",
    ngay: "20/09/2024",
    noiDung: "ngày một tham quang vịn hã long , ngày 2 tham quang nhà bèng",
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
      `Bạn có chắc chắn muốn xóa Lịch Trình Tour với ID: ${id}?`
    );
    if (confirmDelete) {
      message.success(`Đã xóa thành công: ${id}`); // Hiển thị thông báo
      // Logic xóa người dùng khỏi dữ liệu nếu cần
    }
  };

  return (
    <div className="container">
      <h3>Lịch Trình Tour</h3>

      {/* Nút "Thêm" */}
      <ConfigProvider>
        <Space>
          <Button
            className="lichtrinhTour-them"
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
            onClick={showModal}
          >
            Thêm
          </Button>
        </Space>
        <ThemLichTrinhTour visible={visible} onCancel={handleCancel} />
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
        <CapNhatLichTrinhTour
          visible={visible}
          onCancel={handleCancel}
          user={editingUser} // Truyền dữ liệu người dùng vào modal
        />
      )}
    </div>
  );
};

export default App;
