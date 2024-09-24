import React from "react";
import { Select, AutoComplete, Input, Row, Col } from "antd";

// Hàm xử lý khi thay đổi giá trị trong Select
const onChange = (value) => {
  console.log(`selected ${value}`);
};

// Hàm xử lý khi tìm kiếm trong Select
const onSearch = (value) => {
  console.log("search:", value);
};

const App = () => (
  <div>
    <Row gutter={16} align="middle">
      {/* Select đầu tiên */}
      <Col>
        <Select
          showSearch
          placeholder="Sắp xếp theo:"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          style={{ width: 250 }}
          options={[
            {
              value: "1",
              label: "Tour",
            },
            {
              value: "2",
              label: "Loại Tour",
            },
            {
              value: "3",
              label: "Mô tả",
            },
          ]}
        />
      </Col>

      {/* Select thứ hai */}
      <Col>
        <Select
          showSearch
          placeholder="Thứ tự:"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          style={{ width: 250 }}
          options={[
            {
              value: "asc",
              label: "Tăng dần",
            },
            {
              value: "desc",
              label: "Giảm dần",
            },
          ]}
        />
      </Col>

      {/* AutoComplete (tìm kiếm) */}
      <Col>
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          popupMatchSelectWidth={200}
          style={{
            width: 250,
          }}
          size="large"
        >
          <Input.Search size="large" placeholder="Nhập từ khóa tìm kiếm" />
        </AutoComplete>
      </Col>
    </Row>
  </div>
);

export default App;
