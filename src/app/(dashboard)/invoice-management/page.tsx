import InvoiceTable from '@/components/tables/InvoiceTable'
import { MaxWidthWrapper } from '@/components/utils/max-width-wrapper'
import React from 'react'

const page = () => {
  return (
    <MaxWidthWrapper className='mt-[2rem]'>
      <InvoiceTable />
    </MaxWidthWrapper>
  )
}

export default page