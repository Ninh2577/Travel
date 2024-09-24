import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Upload,
  Image,
  DatePicker,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

const { TextArea } = Input;

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const FormThemLoaiTour = ({ visible, onCancel, onBack }) => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [form] = Form.useForm();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <div className="container-fluid mt-5">
      <Modal
        title="Thêm Tin Tức"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={900}
      >
        <Checkbox
          className="mb-3"
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Vô hiệu hóa biểu mẫu
        </Checkbox>
        <Form layout="vertical" disabled={componentDisabled}>
          <div className="row">
            <div className="col-lg-6">
              <Form.Item
                label="Tiêu Đề"
                name="tieuDe"
                rules={[
                  {
                    required: true,
                    message: "Tiêu đề không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Tiêu đề" />
              </Form.Item>
            </div>

            <div className="col-lg-6">
              <Form.Item
                label="Ngày Đăng"
                name="ngayDang"
                rules={[
                  {
                    required: true,
                    message: "Ngày đăng không được để trống!",
                  },
                ]}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </div>
            {/* Thay thế phần Video bằng URL */}
            <div className="col-lg-6">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="url"
                  label="URL - Video"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "url",
                      warningOnly: true,
                    },
                    {
                      type: "string",
                      min: 6,
                    },
                  ]}
                >
                  <Input placeholder="URL - Video ['https://...']" />
                </Form.Item>
              </Form>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Ảnh"
                name="anh"
                rules={[
                  {
                    required: true,
                    message: "Ảnh không được để trống!",
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
            <div className="col-lg-12">
              <Form.Item label="Nội Dung" name="noiDung">
                <TextArea
                  rows={10}
                  placeholder="Nội dung"
                  rules={[
                    {
                      required: true,
                      message: "Nội dung không được để trống!",
                    },
                    {
                      min: 100,
                      message: "Nội dung phải ít nhất 100 ký tự!",
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="col-lg-12">
              <Form.Item label="Mô tả" name="moTa">
                <TextArea rows={3} placeholder="Mô tả" />
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
