import MaterialRequestTable from '@/components/tables/MaterialRequestTable';
import { MaxWidthWrapper } from '@/components/utils/max-width-wrapper'
import React from 'react'

const Page = () => {
  return (
    <MaxWidthWrapper className='mt-[2rem]'>
      <MaterialRequestTable />
    </MaxWidthWrapper>
  )
}

export default Page;
