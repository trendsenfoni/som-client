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
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Item } from '@/types/Item'
import { ButtonConfirm } from '@/components/button-confirm'
import { ItemType } from '@/types/ItemType'
import { ItemQuality } from '@/types/ItemQuality'
import { showError, showInfo } from '@/lib/showToast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
  params: {
    id?: string
  }
}
export default function PageEdit({ params }: Props) {
  const router = useRouter()
  const [token, settoken] = useState('')
  const [item, setItem] = useState<Item>({})
  const [itemTypeList, setItemTypeList] = useState<ItemType[]>([])
  const [itemQuality, setItemQualityList] = useState<ItemQuality[]>([])

  const save = () => {
    if (params.id == 'addnew') {
      postItem(`/db/items/${params.id}`, token, item)
        .then(result => {
          showInfo('Kayıt başarılı')
          setTimeout(() => router.back(), 700)
        })
        .catch(showError)
    } else {
      putItem(`/db/items/${params.id}`, token, item)
        .then(result => {
          showInfo('Kayıt başarılı')
          setTimeout(() => router.back(), 700)
        })
        .catch(showError)
    }
  }

  const loadItemTypes = (search: string) => {
    getList(`/db/itemTypes?pageSize=30&search=${search}`, token)
      .then(result => setItemTypeList(result.docs as ItemType[]))
      .catch(showError)
  }
  const loadItemQualities = (search: string) => {
    getList(`/db/itemQualities?pageSize=30&search=${search}`, token)
      .then(result => setItemQualityList(result.docs as ItemQuality[]))
      .catch(showError)
  }

  const chooseItemType = () => {
    return (<>
    </>)
  }

  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      if (params.id != 'addnew') {
        getItem(`/db/items/${params.id}`, token)
          .then(result => setItem(result as Item))
          .catch(showError)
      }
    }
  }, [token])
  return (<div>
    <div className=" mx-auto py-8 px-0 md:px-6">

      <div className="grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className=''>
            <Label>İsim</Label>
            <Input defaultValue={item.name} onChange={e => setItem({ ...item, name: e.target.value })} />
          </div>
          <div className='col-span-3'>
            <Label>Açıklama</Label>
            <Input defaultValue={item.description} onChange={e => setItem({ ...item, description: e.target.value })} />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-row justify-between gap-4 mt-4'>
        <div>
          {params.id != 'addnew' &&
            <ButtonConfirm
              text='Kayıt silinsin mi?'
              description={`${item && item.name}`}
              onOk={() => {
                deleteItem(`/db/items/${params.id}`, token)
                  .then(result => {
                    showInfo('Kayıt silindi')
                    setTimeout(() => router.back(), 700)
                  })
                  .catch(showError)
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

  </div>)
}