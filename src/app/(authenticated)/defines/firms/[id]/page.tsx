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

import { ComboboxItemTypeList } from '@/app/(authenticated)/(components)/combobox-itemTypes'
import { ComboboxItemQualityList } from '@/app/(authenticated)/(components)/combobox-itemQualities'
import { FirmType } from '@/types/FirmType'

interface Props {
  params: {
    id?: string
  }
}
export default function PageEdit({ params }: Props) {
  const router = useRouter()
  const [token, settoken] = useState('')
  const [firm, setFirm] = useState<FirmType>({ type: params.id == 'newCustomer' ? 'customer' : 'vendor' })
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const save = () => {
    if (params.id == 'addnew') {
      postItem(`/db/firms/${params.id}`, token, firm)
        .then(result => {
          toast({ title: 'Kayıt başarılı', duration: 700 })
          setTimeout(() => router.back(), 700)
        })
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
    } else {

      putItem(`/db/items/${params.id}`, token, firm)
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
        getItem(`/db/items/${params.id}`, token)
          .then(result => {
            setFirm(result as FirmType)
          })
          .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
          .finally(() => setLoading(false))
      }
    }
  }, [token])
  return (<>
    {!loading && <>
      <div className=" mx-auto py-8 px-0 md:px-6">

        <div className="grid gap-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className=''>
              <Label>İsim</Label>
              <Input defaultValue={firm.name} onChange={e => setFirm({ ...firm, name: e.target.value })} />
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
                  deleteItem(`/db/items/${params.id}`, token)
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