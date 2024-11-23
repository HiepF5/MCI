import { Input, Typography } from 'antd';
const { Title } = Typography;

const Header = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <Title level={3}>Quản lý khách hàng</Title>
      <Input.Search placeholder="Tìm theo tên, SĐT, Email" style={{ width: 300 }} />
    </div>
  );
};

export default Header;
