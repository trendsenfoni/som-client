"use client"

import { BreadcrumbAbi } from '@/components/breadcrumb'
import { FirmList } from '../../firm-list'

export default function CustomersPage() {
  return (<>
    <BreadcrumbAbi list={[
      { href: '/defines', children: <span>Tanimlar</span> },
      { href: '/defines/firms/customers', children: "Müşteriler" },
    ]} />
    <FirmList type='customer' />
  </>)
}