import StaffTable from '@/components/tables/StaffTable'
import { MaxWidthWrapper } from '@/components/utils/max-width-wrapper'
import React from 'react'

const page = () => {
  return (
    <MaxWidthWrapper className='mt-[2rem]'>
      <StaffTable />
    </MaxWidthWrapper>
  )
}

export default page