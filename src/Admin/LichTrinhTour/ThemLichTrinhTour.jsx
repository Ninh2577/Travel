import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Select, Modal } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const { TextArea } = Input;

new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const FormThemLichTrinhTour = ({ visible, onCancel, onBack }) => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <div className="container-fluid mt-5">
      <Modal
        title="Thêm Lich Trình Tour"
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
            <div className="col-lg-6">
              <Form.Item
                label="Tiêu Đề"
                name="tieuDe"
                rules={[
                  {
                    required: true,
                    message: "Tiêu Đề không bỏ trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item label="Ngày">
                <DatePicker
                  className="w-100"
                  name="ngay"
                  rules={[
                    {
                      required: true,
                      message: "Ngày không bỏ trống!",
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="col-lg-6">
              <Form.Item label="Tên Tour">
                <Select>
                  <Select.Option value="vaiTro">Tour A </Select.Option>
                  <Select.Option value="vaiTro">Tour B</Select.Option>
                  <Select.Option value="vaiTro">Tour C</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-12">
              <Form.Item label="Nội Dung">
                <TextArea rows={10} />
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

export default FormThemLichTrinhTour;
