import React, { useState } from "react";
import { Table, Tooltip, Button, ConfigProvider, Space, message } from "antd";
import {
  AntDesignOutlined,
  DeleteOutlined,
  HighlightTwoTone,
} from "@ant-design/icons";
import TimKiem from "./TimKiem_DiaDiem"; // Kiểm tra tệp này
import ThemBienTheTour from "./ThemDiaDiem"; // Kiểm tra
import CapNhatBienTheTour from "./CapNhatDiaDiem"; // Kiểm tra

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
    title: "Phường Xã",
    dataIndex: "phuongXa",
    key: "phuongXa",
    ellipsis: {
      showTitle: false,
    },
    render: (phuongXa) => (
      <Tooltip placement="topLeft" title={phuongXa}>
        {phuongXa}
      </Tooltip>
    ),
  },
  {
    title: "Quận Huyện",
    dataIndex: "quanHuyen",
    key: "quanHuyen",
    ellipsis: {
      showTitle: false,
    },
    render: (quanHuyen) => (
      <Tooltip placement="topLeft" title={quanHuyen}>
        {quanHuyen}
      </Tooltip>
    ),
  },
  {
    title: "Tỉnh Thành",
    dataIndex: "tinhThanh",
    key: "tinhThanh",
    ellipsis: {
      showTitle: false,
    },
    render: (tinhThanh) => (
      <Tooltip placement="topLeft" title={tinhThanh}>
        {tinhThanh}
      </Tooltip>
    ),
  },
  {
    title: "Vị Trí",
    dataIndex: "viTri",
    key: "viTri",
    ellipsis: {
      showTitle: false,
    },
    render: (viTri) => (
      <Tooltip placement="topLeft" title={viTri}>
        {viTri}
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
    phuongXa: "Phườnng Xã",
    quanHuyen: "Quận Huyện",
    tinhThanh: "Tỉnh Thành",
    viTri: "Vị Trí",
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
