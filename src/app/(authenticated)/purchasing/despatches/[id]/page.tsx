"use client"

import { DespatchForm } from '@/app/(authenticated)/(components)/despatch-form'
import { BreadcrumbAbi } from '@/components/breadcrumb'

interface Props {
  params: {
    id?: string
  }
}
export default function PageEdit({ params }: Props) {

  return (<>
    <BreadcrumbAbi list={[
      { href: '/purchasing', children: "Satın Alma" },
      { href: '/purchasing/despatches', children: "Gelen İrsaliyeler" },
      { children: params.id == 'addnew' ? 'Yeni İrsaliye' : 'Düzenle' },
    ]} />
    <DespatchForm despatchId={params.id} ioType={1} />
  </>)
}