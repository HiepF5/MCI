import React, { useState, useEffect } from 'react'
import Header from '../Header'
import AddCustomerButton from '../AddCustomerButton'
import CustomerTable from '../CustomerTable'
import CustomPagination from '../CustomPagination'
import { getCustomer } from '../../apis/userApi'

const TableViewPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const fetchData = async () => {
    try {
      const response = await getCustomer()
      setData(response.results)
    } catch (error) {
      console.error('Failed to fetch customer data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <Header />
        <AddCustomerButton onCustomerAdded={fetchData} />
        <CustomerTable data={data} />
        <CustomPagination current={currentPage} total={3459} onChange={handlePageChange} />
      </div>
    </div>
  )
}

export default TableViewPage
