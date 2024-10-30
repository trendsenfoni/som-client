"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { deleteItem, getItem, getList, postItem, putItem } from '@/lib/fetch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import CustomLink from '@/components/custom-link'
import { ButtonConfirm } from '@/components/button-confirm'

import { FirmType } from '@/types/FirmType'
import { BreadcrumbAbi } from '@/components/breadcrumb'
import { SelectCountry } from '@/components/select-country'

interface Props {
  params: {
    id?: string
  }
}
export default function PageEdit({ params }: Props) {
  const router = useRouter()
  const [token, settoken] = useState('')
  const [firm, setFirm] = useState<FirmType>({
    type: params.id == 'newCustomer' ? 'customer' : 'vendor',
    billingInfo: {}
  })
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const save = () => {
    if (params.id == 'newCustomer' || params.id == 'newVendor') {
      postItem(`/db/firms/${params.id}`, token, firm)
        .then(result => {
          toast({ title: 'Kayıt başarılı', duration: 700 })
          setTimeout(() => router.back(), 700)
        })
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
    } else {

      putItem(`/db/firms/${params.id}`, token, firm)
        .then(result => {
          toast({ title: 'Kayıt başarılı', duration: 700 })
          setTimeout(() => router.back(), 700)
        })
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
    }
  }


  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      if (params.id != 'addnew') {
        setLoading(true)
        getItem(`/db/firms/${params.id}`, token)
          .then(result => {
            setFirm(result as FirmType)
          })
          .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
          .finally(() => setLoading(false))
      }
    }
  }, [token])
  return (<>
    {firm.type == 'customer' &&
      < BreadcrumbAbi list={[
        { href: '/defines', children: <span>Tanımlar</span> },
        { href: '/defines/firms/customers', children: "Müşteriler" },
        { children: "Müşteri Kartı" },
      ]} />
    }
    {firm.type == 'vendor' &&
      < BreadcrumbAbi list={[
        { href: '/defines', children: <span>Tanımlar</span> },
        { href: '/defines/firms/vendors', children: "Tedarikçiler" },
        { children: "Tedarikçi Kartı" },
      ]} />
    }
    {!loading && <>
      <div className=" mx-auto py-8 px-0 md:px-6">

        <div className="grid gap-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className='md:col-span-3'>
              <Label>İsim</Label>
              <Input defaultValue={firm.name} onChange={e => setFirm({ ...firm, name: e.target.value })} />
            </div>
            <div className=''>
              <Label>Stok Artikel</Label>
              <Input defaultValue={firm.itemArticle} onChange={e => setFirm({ ...firm, itemArticle: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-dashed rounded-md p-2">
            <div className='md:col-span-4 flex items-center gap-2'>
              <Switch id='individual' defaultChecked={firm.billingInfo?.individual} onCheckedChange={e => setFirm({ ...firm, billingInfo: { ...firm.billingInfo, individual: e } })} />
              <Label htmlFor='individual' className='cursor-pointer'>Şahıs Firması</Label>
            </div>

            {!firm.billingInfo?.individual &&
              <div className='md:col-span-3'>
                <Label>Şirket İsmi (Resmi)</Label>
                <Input
                  defaultValue={firm.billingInfo?.companyName}
                  onChange={e => setFirm({ ...firm, billingInfo: { ...firm.billingInfo, companyName: e.target.value } })}
                />
              </div>
            }
            {firm.billingInfo?.individual &&
              <div className='md:col-span-3 grid grid-cols-2 gap-4  bor11der border-da11shed rou11nded-md p11-2'>
                <div className=''>
                  <Label>İsim</Label>
                  <Input
                    defaultValue={firm.billingInfo?.firstName}
                    onChange={e => {
                      setFirm({ ...firm, billingInfo: { ...firm.billingInfo, firstName: e.target.value } })
                    }}
                  />
                </div>
                <div className=''>
                  <Label>Soyad</Label>
                  <Input
                    defaultValue={firm.billingInfo?.lastName}
                    onChange={e => {
                      setFirm({ ...firm, billingInfo: { ...firm.billingInfo, lastName: e.target.value } })
                    }}
                  />
                </div>
              </div>
            }
            <div className='md:col-span-2'>
              <Label>Vergi Dairesi</Label>
              <Input
                defaultValue={firm.billingInfo?.taxOffice}
                onChange={e => setFirm({ ...firm, billingInfo: { ...firm.billingInfo, taxOffice: e.target.value } })}
              />
            </div>
            <div className=''>
              <Label>Vergi No</Label>
              <Input
                type='number' max={10}
                defaultValue={firm.billingInfo?.taxNumber}
                onChange={e => setFirm({ ...firm, billingInfo: { ...firm.billingInfo, taxNumber: e.target.value } })}
              />
            </div>
            {firm.billingInfo?.individual &&
              <div className=''>
                <Label>TC.Kimlik No</Label>
                <Input type='number' max={11}
                  defaultValue={firm.billingInfo?.idCardNo}
                  onChange={e => setFirm({ ...firm, billingInfo: { ...firm.billingInfo, idCardNo: e.target.value } })}
                />
              </div>
            }
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-dashed rounded-md p-2">
            <div className=''>
              <Label>Ülke</Label>
              <SelectCountry width='w-[300px]' defaultValue={firm.address?.country} onChange={e => setFirm({ ...firm, address: { ...firm.address, country: e } })} />
            </div>
            <div className=''>
              <Label>Şehir</Label>
              <Input defaultValue={firm.address?.cityName}
                onChange={e => setFirm({ ...firm, address: { ...firm.address, cityName: e.target.value } })}
              />
            </div>
            <div className=''>
              <Label>İlçe/Mahalle</Label>
              <Input defaultValue={firm.address?.citySubdivisionName}
                onChange={e => setFirm({ ...firm, address: { ...firm.address, citySubdivisionName: e.target.value } })}
              />
            </div>
            <div className=''>
              <Label>Cadde/Sokak</Label>
              <Input defaultValue={firm.address?.streetName}
                onChange={e => setFirm({ ...firm, address: { ...firm.address, streetName: e.target.value } })}
              />
            </div>
            <div className=''>
              <Label>Sokak Kapı No</Label>
              <Input defaultValue={firm.address?.buildingNumber}
                onChange={e => setFirm({ ...firm, address: { ...firm.address, buildingNumber: e.target.value } })}
              />
            </div>
            <div className=''>
              <Label>Apartman/Site/Bina Adı</Label>
              <Input defaultValue={firm.address?.buildingName}
                onChange={e => setFirm({ ...firm, address: { ...firm.address, buildingName: e.target.value } })}
              />
            </div>

            <div className=''>
              <Label>Blok</Label>
              <Input defaultValue={firm.address?.blockName}
                onChange={e => setFirm({ ...firm, address: { ...firm.address, blockName: e.target.value } })}
              />
            </div>

            <div className=''>
              <Label>Daire No</Label>
              <Input defaultValue={firm.address?.room}
                onChange={e => setFirm({ ...firm, address: { ...firm.address, room: e.target.value } })}
              />
            </div>
            <div className=''>
              <Label>Posta Kodu</Label>
              <Input defaultValue={firm.address?.postalZone}
                onChange={e => setFirm({ ...firm, address: { ...firm.address, postalZone: e.target.value } })}
              />
            </div>
          </div>

        </div>
        <div className='w-full flex flex-row justify-between gap-4 mt-4'>
          <div>
            {params.id != 'addnew' &&
              <ButtonConfirm
                text='Kayıt silinsin mi?'
                description={`${firm && firm.name}`}
                onOk={() => {
                  deleteItem(`/db/firms/${params.id}`, token)
                    .then(result => {
                      toast({ title: 'Kayıt silindi', duration: 700 })
                      setTimeout(() => router.back(), 700)
                    })
                    .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
                }}>
                <div className='bg-red-600 text-white px-4 py-2 rounded-md'>
                  <i className='fa-solid fa-trash-alt'></i>
                </div>
              </ButtonConfirm>
            }
          </div>
          <div className='w-full flex flex-row justify-end gap-4 mt-4'>
            <Button className="text-2xl" variant={'secondary'} onClick={() => router.back()}><i className="fa-solid fa-angle-left"></i>       </Button>
            <Button className="text-2xl" onClick={save}><i className="fa-solid fa-cloud-arrow-up"></i>        </Button>
          </div>
        </div>
      </div>
    </>}
  </>)
}