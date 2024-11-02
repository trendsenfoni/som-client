"use client"

import { BreadcrumbAbi } from '@/components/breadcrumb'
import ButtonLink from '@/components/button-link'
import { DespatchList } from '../../(components)/despatch-list'

export default function DefinesPage() {

  return (<>
    <BreadcrumbAbi list={[
      { href: '/purchasing', children: "Satın Alma" },
      { href: '/purchasing/despaches', children: "Gelen İrsaliyeler" },
    ]} />
    <DespatchList ioType={1} />
  </>)
}