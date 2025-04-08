import ProductTable from '@/components/tables/ProductTable'
import { MaxWidthWrapper } from '@/components/utils/max-width-wrapper'
import React from 'react'

const page = () => {
  return (
    <MaxWidthWrapper className='mt-[2rem]'>
      <ProductTable />
    </MaxWidthWrapper>
  )
}

export default page