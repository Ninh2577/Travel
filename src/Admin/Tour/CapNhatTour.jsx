import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Upload,
  Image,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FormCapNhatTour = ({ visible, onCancel, onBack }) => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [number, setNumber] = useState(1); // Quản lý giá trị số lượng người

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  const onNumberChange = (value) => {
    setNumber(value); // Cập nhật số lượng người
  };

  return (
    <div className="container-fluid mt-5">
      <Modal
        title="Cập Nhật Tour Du Lịch"
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
                label="Tên Tour"
                name="tenTour"
                rules={[
                  {
                    required: true,
                    message: "Tên Tour không bỏ trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Giá Tiền"
                name="giaTien"
                rules={[
                  {
                    required: true,
                    message: "Giá Tiền không bỏ trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Ngày Bắt Đầu"
                name="ngayBatDau"
                rules={[
                  {
                    required: true,
                    message: "Ngày Bắt Đầu không bỏ trống!",
                  },
                ]}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Ngày Kết Thúc"
                name="ngayKetThuc"
                rules={[
                  {
                    required: true,
                    message: "Ngày Kết Thúc không bỏ trống!",
                  },
                ]}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Số Lượng Người"
                name="soLuongNguoi"
                rules={[
                  {
                    required: true,
                    message: "Số Lượng Người không bỏ trống!",
                  },
                ]}
              >
                <InputNumber value={number} onChange={onNumberChange} />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Số Tour"
                name="soTour"
                rules={[
                  {
                    required: true,
                    message: "Số Tour không bỏ trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Ảnh"
                name="anh"
                rules={[
                  {
                    required: true,
                    message: "Ảnh không bỏ trống!",
                  },
                ]}
              >
                <Upload
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                    }}
                    src={previewImage}
                    className="img-fluid"
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                name="video"
                label="URL - Video"
                rules={[
                  {
                    required: true,
                    message: "URL Video không bỏ trống!",
                  },
                  {
                    type: "url",
                    warningOnly: true,
                    message: "URL không hợp lệ!",
                  },
                ]}
              >
                <Input placeholder="URL - Video ['https://...']" />
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
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Button className="btn btn-secondary" onClick={onBack}>
              Quay Lại
            </Button>
            <Button className="btn btn-primary" htmlType="submit">
              Xác Nhận
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormCapNhatTour;
