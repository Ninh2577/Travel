import React, { useState } from "react";
import { Table, Tooltip, Button, ConfigProvider, Space, message } from "antd";
import {
  AntDesignOutlined,
  DeleteOutlined,
  HighlightTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import TimKiem from "./TimKiem_TinTuc"; // Kiểm tra tệp này
import ThemPhanQuyen from "./ThemTinTuc"; // Kiểm tra
import CapNhatTinTuc from "./CapNhatTinTuc"; // Kiểm tra
import ChiTietTinTuc from "./ChiTietTinTuc"; // Kiểm tra

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
    title: "Ảnh",
    dataIndex: "anh",
    key: "anh",
    render: (anh) => (
      <img src={anh} alt="Profile" style={{ width: 100, height: 100 }} />
    ),
  },
  {
    title: "Ngày Đăng",
    dataIndex: "ngayDang",
    key: "ngayDang",
    ellipsis: {
      showTitle: false,
    },
    render: (ngayDang) => (
      <Tooltip placement="topLeft" title={ngayDang}>
        {ngayDang}
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
    title: "Video",
    dataIndex: "video",
    key: "video",
    render: (video) => (
      <iframe
        width="120"
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
    tieuDe: "Tour nhiều ngày",
    noiDung: ["2 ngày một đêm", "3 ngày"],
    anh: "https://tse4.mm.bing.net/th?id=OIP.YFoR2ukuO5LQ-ynHsKBPxgHaEh&pid=Api&P=0&h=220",
    video: "https://www.youtube.com/embed/06XH4TTTBnE",
    ngayDang: "23/09/2024",
    moTa: "cần thơ có chợ nổi",
  },
];

// Component chính
const App = () => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
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

  const handleChiTiet = (user) => {
    setEditingUser(user); // Đặt người dùng cần xem chi tiết
    setVisibleDetail(true); // Mở modal xem chi tiết
  };

  const handleCancelDetail = () => {
    setVisibleDetail(false);
    setEditingUser(null); // Reset trạng thái người dùng sau khi đóng modal
  };

  // Hàm xử lý xóa và hiển thị thông báo
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa Tin Tức này với ID: ${id}?`
    );
    if (confirmDelete) {
      message.success(`Đã xóa thành công: ${id}`); // Hiển thị thông báo
      // Logic xóa người dùng khỏi dữ liệu nếu cần
    }
  };

  return (
    <div className="container">
      <h3>Quản Lý Tin Tức</h3>

      {/* Nút "Thêm" */}
      <ConfigProvider>
        <Space>
          <Button
            className="tintuc-them"
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
            onClick={showModalEdit}
          >
            Thêm tin tức
          </Button>
        </Space>
        <ThemPhanQuyen visible={visibleEdit} onCancel={handleCancelEdit} />
      </ConfigProvider>

      {/* Tìm kiếm người dùng */}
      <TimKiem />

      {/* Bảng người dùng */}
      <div
        className="table-container align-items-center"
        style={{ marginRight: "-100px" }}
      >
        <Table
          columns={columns(showEditModal, handleDelete, handleChiTiet)}
          dataSource={data}
        />
      </div>

      {/* Modal cập nhật tin tức */}
      {editingUser && (
        <CapNhatTinTuc
          visible={visibleEdit}
          onCancel={handleCancelEdit}
          user={editingUser} // Truyền dữ liệu người dùng vào modal
        />
      )}

      {/* Modal chi tiết tin tức */}
      {editingUser && (
        <ChiTietTinTuc
          visible={visibleDetail}
          onCancel={handleCancelDetail}
          user={editingUser} // Truyền dữ liệu người dùng vào modal
        />
      )}
    </div>
  );
};

export default App;
