import React, { useState } from "react";
import { Table, Tooltip, Button, ConfigProvider, Space, message } from "antd";
import {
  AntDesignOutlined,
  DeleteOutlined,
  HighlightTwoTone,
} from "@ant-design/icons";
import TimKiem from "./TimKiem_Tour.jsx";
import ThemNhanVien from "./ThemTour.jsx";
import CapNhatNguoiDung from "./CapNhatTour.jsx";

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
    title: "Giá Tiền",
    dataIndex: "giaTien",
    key: "giaTien",
    render: (text) => (
      <a href="#!" onClick={(e) => e.preventDefault()}>
        {text}
      </a>
    ),
    width: 80,
  },
  {
    title: "Ngày Bắt Đầu",
    dataIndex: "ngayBatDau",
    key: "ngayBatDau",
    ellipsis: {
      showTitle: false,
    },
    render: (ngayBatDau) => (
      <Tooltip placement="topLeft" title={ngayBatDau}>
        {ngayBatDau}
      </Tooltip>
    ),
  },
  {
    title: "Ngày Kết Thúc",
    dataIndex: "ngayKetThuc",
    key: "ngayKetThuc",
    ellipsis: {
      showTitle: false,
    },
    render: (ngayKetThuc) => (
      <Tooltip placement="topLeft" title={ngayKetThuc}>
        {ngayKetThuc}
      </Tooltip>
    ),
  },
  {
    title: "Số Lượng Người",
    dataIndex: "soLuongNguoi",
    key: "soLuongNguoi",
    render: (text) => (
      <a href="#!" onClick={(e) => e.preventDefault()}>
        {text}
      </a>
    ),
    width: 100,
  },
  {
    title: "Số Tour",
    dataIndex: "soTour",
    key: "soTour",
    render: (text) => (
      <a href="#!" onClick={(e) => e.preventDefault()}>
        {text}
      </a>
    ),
    width: 100,
  },
  {
    title: "Trạng Thái",
    dataIndex: "trangThai",
    key: "trangThai",
    render: (trangThai) => (
      <Tooltip placement="topLeft" title={trangThai}>
        {trangThai}
      </Tooltip>
    ),
    width: 100,
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
    title: "Video",
    dataIndex: "video",
    key: "video",
    render: (video) => (
      <iframe
        width="50"
        height="50"
        src={video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ),
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
    tenTour: "du lịch",
    giaTien: 1000,
    ngayBatDau: "20/09/2024",
    ngayKetThuc: "24/09/2024",
    soLuongNguoi: 5,
    trangThai: "Còn",
    anh: "https://tse2.mm.bing.net/th?id=OIP.vPGgc4SKt1K93o4ogYizSwHaFj&pid=Api&P=0&h=220",
    video: "https://www.youtube.com/embed/TfKOFRpqSME", // Liên kết nhúng đúng
    loaiTour: "Gia đình",
    soTour: 5, // Example image URL
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
      <h3>Danh Sách Tour</h3>

      {/* Nút "Thêm" */}
      <ConfigProvider>
        <Space>
          <Button
            className="nguoidung-them"
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
            onClick={showModal}
          >
            Thêm
          </Button>
        </Space>
        <ThemNhanVien visible={visible} onCancel={handleCancel} />
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
        <CapNhatNguoiDung
          visible={visible}
          onCancel={handleCancel}
          user={editingUser} // Truyền dữ liệu người dùng vào modal
        />
      )}
    </div>
  );
};

export default App;
