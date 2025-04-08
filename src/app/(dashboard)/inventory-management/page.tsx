import InventoryTable from '@/components/tables/InventoryTable'
import { MaxWidthWrapper } from '@/components/utils/max-width-wrapper'
import React from 'react'

const page = () => {
  return (
    <MaxWidthWrapper className='mt-[2rem]'>
      <InventoryTable />
    </MaxWidthWrapper>
  )
}

export default page