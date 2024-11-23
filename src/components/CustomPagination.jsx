import { Pagination } from 'antd';

const CustomPagination = ({ current, total, onChange }) => {
  return (
    <div style={{ textAlign: 'right', marginTop: '20px' }}>
      <Pagination
        current={current}
        total={total}
        pageSize={20}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default CustomPagination;
