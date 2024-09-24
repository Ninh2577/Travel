import React, { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Modal,
  Upload,
  Image,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FormThemKhachHang = ({ visible, onCancel, onBack }) => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

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

  return (
    <div className="container-fluid mt-5">
      <Modal
        title="Thêm Khách Hàng"
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
                label="Họ & Tên"
                name="hoTen"
                rules={[
                  {
                    required: true,
                    message: "Họ & Tên không bỏ trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Số Điện Thoại"
                name="soDienThoai"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không bỏ trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email không bỏ trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Mật Khẩu"
                name="matKhau"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không bỏ trống!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item label="Giới Tính">
                <Select>
                  <Select.Option value="vaiTro">Nam </Select.Option>
                  <Select.Option value="vaiTro">Nữ </Select.Option>
                  <Select.Option value="vaiTro">
                    Tổi không muốn công khai{" "}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item label="Ngày Sinh">
                <DatePicker
                  className="w-100"
                  name="ngaySinh"
                  rules={[
                    {
                      required: true,
                      message: "Ngày sinh không bỏ trống!",
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="col-lg-6">
              <Form.Item label="Địa chỉ">
                <TextArea rows={3} />
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

export default FormThemKhachHang;
