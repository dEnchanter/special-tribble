import DashboardTable from '@/components/tables/DashboardTable'
import { MaxWidthWrapper } from '@/components/utils/max-width-wrapper'
import React from 'react'

const page = () => {
  return (
    <MaxWidthWrapper className='mt-[2rem]'>
      <DashboardTable />
    </MaxWidthWrapper>
  )
}

export default page