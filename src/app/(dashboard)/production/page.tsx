import ProductionItemsTable from '@/components/tables/ProductionItemsTable'
import { MaxWidthWrapper } from '@/components/utils/max-width-wrapper'
import React from 'react'

const page = () => {
  return (
    <MaxWidthWrapper className='mt-[2rem]'>
      <ProductionItemsTable />
    </MaxWidthWrapper>
  )
}

export default page