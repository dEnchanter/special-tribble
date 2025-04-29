import RawItemsTable from '@/components/tables/RawItemsTable'
import { MaxWidthWrapper } from '@/components/utils/max-width-wrapper'
import React from 'react'

const page = () => {
  return (
    <MaxWidthWrapper className='mt-[2rem]'>
      <RawItemsTable />
    </MaxWidthWrapper>
  )
}

export default page