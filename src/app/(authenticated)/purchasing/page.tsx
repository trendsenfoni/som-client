"use client"

import { BreadcrumbAbi } from '@/components/breadcrumb'
import ButtonLink from '@/components/button-link'

export default function DefinesPage() {

  return (<>
    <BreadcrumbAbi list={[
      { href: '/purchasing', children: "Satın Alma" },
    ]} />
    <h1 ><i className="fa-solid fa-dolly me-2"></i> Satın Alma</h1>
    <hr />
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-4'>
      <ButtonLink className='' href='/purchasing/despatches'><i className="fa-solid fa-truck-arrow-right"></i> Gelen İrsaliyeler</ButtonLink>

    </div>
  </>)
}