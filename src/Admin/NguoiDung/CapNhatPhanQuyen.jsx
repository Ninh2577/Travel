import React, { useState } from "react";
import { Button, Checkbox, Form, Select, Modal, Table, Tag, Space } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const FormThemPhanQuyen = ({ visible, onCancel, onBack }) => {
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
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Vai Trò",
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
      tags: ["nice", "developer"],
    },
    {
      id: "2",
      tags: ["loser"],
    },
    {
      id: "3",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div className="container-fluid mt-5">
      <Modal
        title="Cập Nhật Vai Trò Cho Nhân Viên"
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
                label="Email Nhân Viên"
                name="emailNhanVien"
                rules={[
                  {
                    required: true,
                    message: "Email nhân viên không bỏ trống!",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="NguyenVanA@gmail.com">
                    NguyenVanA@gmail.com
                  </Select.Option>
                  <Select.Option value="NguyenVanB@gmail.com">
                    NguyenVanB@gmail.com
                  </Select.Option>
                  <Select.Option value="NguyenVanC@gmail.com">
                    NguyenVanC@gmail.com
                  </Select.Option>
                  <Select.Option value="NguyenVanD@gmail.com">
                    NguyenVanD@gmail.com
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-12">
              {/* Thêm bảng vào đây */}
              <Form.Item
                label="Vai Trò"
                name="vaiTro"
                rules={[{ required: true, message: "Vai trò không bỏ trống!" }]}
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

export default FormThemPhanQuyen;
