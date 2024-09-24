import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const { TextArea } = Input;
const FormThemDiaDiem = ({ visible, onCancel, onBack }) => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Lấy danh sách tỉnh thành khi component được mount
  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      })
      .catch((error) => console.error("Lỗi khi lấy tỉnh thành:", error));
  }, []);

  // Lấy danh sách quận huyện khi người dùng chọn tỉnh
  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setDistricts(response.data.data);
            setWards([]); // Reset phường xã khi thay đổi tỉnh
          }
        })
        .catch((error) => console.error("Lỗi khi lấy quận huyện:", error));
    }
  }, [selectedProvince]);

  // Lấy danh sách phường xã khi người dùng chọn quận
  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setWards(response.data.data);
          }
        })
        .catch((error) => console.error("Lỗi khi lấy phường xã:", error));
    }
  }, [selectedDistrict]);

  return (
    <div className="container-fluid mt-5">
      <Modal
        title="Thêm Địa Điểm"
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
                label="Tên Tour"
                name="tenTour"
                rules={[
                  { required: true, message: "Tên tour không bỏ trống!" },
                ]}
              >
                <Select>
                  <Select.Option value="1">Xô đảo bình hưng</Select.Option>
                  <Select.Option value="2">Tour côn đảo</Select.Option>
                  <Select.Option value="3">Đảo phú quý</Select.Option>
                  <Select.Option value="4">Tour Phú Quốc</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Vị Trí"
                name="viTri"
                rules={[{ required: true, message: "Vị trí không bỏ trống!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Tỉnh Thành"
                name="tinhThanh"
                rules={[
                  { required: true, message: "Tỉnh thành không bỏ trống!" },
                ]}
              >
                <Select
                  onChange={setSelectedProvince}
                  placeholder="Chọn tỉnh thành"
                >
                  {provinces.map((province) => (
                    <Select.Option key={province.id} value={province.id}>
                      {province.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Quận Huyện"
                name="quanHuyen"
                rules={[
                  { required: true, message: "Quận huyện không bỏ trống!" },
                ]}
              >
                <Select
                  onChange={setSelectedDistrict}
                  placeholder="Chọn quận huyện"
                  disabled={!selectedProvince}
                >
                  {districts.map((district) => (
                    <Select.Option key={district.id} value={district.id}>
                      {district.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Phường Xã"
                name="phuongXa"
                rules={[
                  { required: true, message: "Phường xã không bỏ trống!" },
                ]}
              >
                <Select
                  placeholder="Chọn phường xã"
                  disabled={!selectedDistrict}
                >
                  {wards.map((ward) => (
                    <Select.Option key={ward.id} value={ward.id}>
                      {ward.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-6">
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

export default FormThemDiaDiem;
