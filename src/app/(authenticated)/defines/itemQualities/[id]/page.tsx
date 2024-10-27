"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { deleteItem, getItem, postItem, putItem } from '@/lib/fetch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import CustomLink from '@/components/custom-link'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ItemQuality } from '@/types/ItemQuality'
import { ButtonConfirm } from '@/components/button-confirm'
interface Props {
  params: {
    id?: string
  }
}
export default function PageEdit({ params }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [token, settoken] = useState('')
  const [itemQuality, setItemQuality] = useState<ItemQuality>({})


  const save = () => {
    if (params.id == 'addnew') {
      postItem(`/db/itemQualities/${params.id}`, token, itemQuality)
        .then(result => {
          toast({ description: 'Kayit basarili' })
          setTimeout(() => router.back(), 1000)
        })
        .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
    } else {
      putItem(`/db/itemQualities/${params.id}`, token, itemQuality)
        .then(result => {
          toast({ description: 'Kayit basarili' })
          setTimeout(() => router.back(), 1000)
        })
        .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
    }
  }

  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      if (params.id != 'addnew') {
        getItem(`/db/itemQualities/${params.id}`, token)
          .then(result => setItemQuality(result as ItemQuality))
          .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      }
    }
  }, [token])
  return (<div>
    <div className="w-fu11ll m11ax-w-3xl mx-auto py-8 px-0 md:px-6">

      <div className="grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className=''>
            <Label>Kalite</Label>
            <Input defaultValue={itemQuality.name} onChange={e => setItemQuality({ ...itemQuality, name: e.target.value })} />
          </div>
          <div className=''>
            <Label>Artikel</Label>
            <Input defaultValue={itemQuality.article} onChange={e => setItemQuality({ ...itemQuality, article: e.target.value })} />
          </div>
        </div>
      </div >
      <div className='w-full flex flex-row justify-between gap-4 mt-4'>
        <div>
          {params.id != 'addnew' &&
            <ButtonConfirm
              text='Kayıt silinsin mi?'
              description={`${itemQuality && itemQuality.name}`}
              onOk={() => {
                deleteItem(`/db/itemQualities/${params.id}`, token)
                  .then(result => {
                    toast({ description: 'Kayıt silindi' })
                    setTimeout(() => router.back(), 1000)
                  })
                  .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
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