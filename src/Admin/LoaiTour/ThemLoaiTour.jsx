import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Table,
  Tooltip,
  Space,
} from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
const { TextArea } = Input;
const FormThemLoaiTour = ({ visible, onCancel, onBack }) => {
  const [componentDisabled, setComponentDisabled] = useState(true);

  // Cột dữ liệu cho bảng
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>, // Sử dụng <span> thay vì <a>
    },
    {
      title: "Tour",
      key: "tour",
      dataIndex: "tour",
      render: (tour) => (
        <Tooltip placement="topLeft" title={tour}>
          {tour}
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Checkbox value={record.id} />
        </Space>
      ),
    },
  ];

  // Dữ liệu mẫu cho bảng
  const data = [
    {
      id: "1",
      tour: "Du lịch gia đình",
    },
    {
      id: "2",
      tour: "Tour độc thân",
    },
    {
      id: "3",
      tour: "Tour có người yêu",
    },
  ];

  return (
    <div className="container-fluid mt-5">
      <Modal
        title="Phân Loại Tour"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={900} // Điều chỉnh chiều rộng modal
      >
        <Checkbox
          className="mb-3"
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Vô hiệu hóa biểu mẫu
        </Checkbox>
        <Form
          layout="vertical" // Đổi layout thành dọc (vertical)
          disabled={componentDisabled}
        >
          <div className="row">
            <div className="col-lg-12">
              <Form.Item
                label="Loại Tour"
                name="loaiTour"
                rules={[
                  {
                    required: true,
                    message: "Loại Tour không bỏ trống!",
                  },
                ]}
              >
                <Input placeholder="Loại Tour" />
              </Form.Item>
              <div className="col-lg-12">
                <Form.Item label="Mô tả">
                  <TextArea rows={3} placeholder="Mô tả" />
                </Form.Item>
              </div>
            </div>
            <div className="col-lg-12">
              {/* Thêm bảng vào đây */}
              <Form.Item
                label="Loại Tour"
                name="loaiTour"
                rules={[
                  { required: true, message: "Loại Tour không bỏ trống!" },
                ]}
              >
                <Table columns={columns} dataSource={data} pagination={false} />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Button className="btn btn-secondary" onClick={onBack}>
              Quay Lại
            </Button>
            <Button
              className="btn btn-primary"
              onClick={onCancel}
              htmlType="submit"
            >
              Xác Nhận
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormThemLoaiTour;
