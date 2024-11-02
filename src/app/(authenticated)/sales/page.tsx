"use client"

import { BreadcrumbAbi } from '@/components/breadcrumb'
import ButtonLink from '@/components/button-link'

export default function DefinesPage() {

  return (<>
    <BreadcrumbAbi list={[
      { href: '/sales', children: "Satış" },
    ]} />
    <h1 ><i className="fa-solid fa-dragon me-2"></i> Satış</h1>
    <hr />
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-4'>
      <ButtonLink href='/inventory/despatches'><i className="fa-solid fa-truck-arrow-right"></i> Irsaliyeler</ButtonLink>

    </div>
  </>)
}