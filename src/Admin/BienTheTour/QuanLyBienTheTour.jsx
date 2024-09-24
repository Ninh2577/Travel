import React, { useState } from "react";
import { Table, Tooltip, Button, ConfigProvider, Space, message } from "antd";
import {
  AntDesignOutlined,
  DeleteOutlined,
  HighlightTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import TimKiem from "./TimKiem_BienTheTour"; // Kiểm tra tệp này
import ThemBienTheTour from "./ThemBienTheTour"; // Kiểm tra
import CapNhatBienTheTour from "./CapNhatBienTheTour"; // Kiểm tra

// Cột dữ liệu của bảng
const columns = (showEditModal, handleDelete, handleChiTiet) => [
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
    title: "Ảnh",
    dataIndex: "anh",
    key: "anh",
    render: (anh) => (
      <img src={anh} alt="Profile" style={{ width: 150, height: 150 }} />
    ),
  },
  {
    title: "Video",
    dataIndex: "video",
    key: "video",
    render: (video) => (
      <iframe
        width="150"
        height="150"
        src={video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
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
        {/* Nút xem chi tiết */}
        <Button
          icon={<EyeTwoTone />}
          onClick={() => handleChiTiet(record)} // Hiển thị modal xem chi tiết
        ></Button>

        {/* Nút Sửa */}
        <Button
          icon={<HighlightTwoTone />}
          onClick={() => showEditModal(record)} // Hiển thị modal chỉnh sửa
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
    tenTour: "Tour nhiều ngày",
    anh: "https://tse4.mm.bing.net/th?id=OIP.YFoR2ukuO5LQ-ynHsKBPxgHaEh&pid=Api&P=0&h=220",
    video: "https://www.youtube.com/embed/06XH4TTTBnE",
    moTa: "cần thơ có chợ nổi",
  },
];

// Component chính
const App = () => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Trạng thái người dùng đang chỉnh sửa

  const showModalEdit = () => {
    setVisibleEdit(true);
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
    setEditingUser(null); // Reset trạng thái người dùng sau khi đóng modal
  };

  const showEditModal = (user) => {
    setEditingUser(user); // Đặt người dùng đang được chỉnh sửa
    setVisibleEdit(true); // Mở modal chỉnh sửa
  };
  // Hàm xử lý xóa và hiển thị thông báo
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa Biến Thể Tour này với ID: ${id}?`
    );
    if (confirmDelete) {
      message.success(`Đã xóa thành công: ${id}`); // Hiển thị thông báo
      // Logic xóa người dùng khỏi dữ liệu nếu cần
    }
  };

  return (
    <div className="container">
      <h3>Quản Lý Biến Thể Tour</h3>

      {/* Nút "Thêm" */}
      <ConfigProvider>
        <Space>
          <Button
            className="bienthetour-them"
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
            onClick={showModalEdit}
          >
            Thêm biến thể Tour
          </Button>
        </Space>
        <ThemBienTheTour visible={visibleEdit} onCancel={handleCancelEdit} />
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

      {/* Modal cập nhật tin tức */}
      {editingUser && (
        <CapNhatBienTheTour
          visible={visibleEdit}
          onCancel={handleCancelEdit}
          user={editingUser} // Truyền dữ liệu người dùng vào modal
        />
      )}
    </div>
  );
};

export default App;
