"use client"

import { BreadcrumbAbi } from '@/components/breadcrumb'
import { FirmList } from '../firm-list'

export default function CustomersPage() {
  return (<>
    <BreadcrumbAbi list={[
      { href: '/defines', children: "Tanımlar" },
      { href: '/defines/firms/customers', children: "Tedarikçiler" },
    ]} />
    <FirmList type='vendor' />
  </>)
}
