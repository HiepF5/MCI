import React, { useState } from 'react';
import { Select, Input, Button, Divider } from 'antd';

const CustomDropdown = ({ placeholder, data, value, onChange, onAdd }) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem) {
      onAdd(newItem);
      setNewItem(''); 
    }
    setNewItem('');
  };

  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      style={{ width: 300 }}
      value={value}
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <div style={{ display: 'flex', gap: '8px', padding: '8px' }}>
            <Input
              placeholder="Thêm nguồn mới"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <Button type="primary" onClick={handleAdd}>
              Thêm
            </Button>
          </div>
        </div>
      )}
    >
      {data.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.title}
        </Select.Option>
      ))}
    </Select>
  );
};
export default CustomDropdown;