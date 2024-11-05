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
import { ItemType } from '@/types/ItemType'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DespatchType } from '@/types/DespatchType'
import { ComboboxFirmList } from './combobox-firms'
import { AddressInputPanel } from './address-inputpanel'
import { InventoryType } from '@/types/InventoryType'
import { DespatchInventoryLine } from './despatch-inventoryLine'
import Link from 'next/link'
interface Props {
  despatch?: DespatchType,
}
export function DespatchInventoryLines({ despatch }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [inventoryLines, setInventoryLines] = useState<InventoryType[]>([])
  const [despatchLine, setDespatchLine] = useState<InventoryType | undefined>()
  const save = () => {
    // if (!despatch?._id) {
    //   postItem(`/db/inventory`, token, despatch)
    //     .then(result => {
    //       toast({ description: 'Kayit basarili' })
    //       // setTimeout(() => router.back(), 1000)
    //       setDespatch(result as DespatchType)
    //     })
    //     .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
    // } else {
    //   putItem(`/db/despatches/${despatch._id}`, token, despatch)
    //     .then(result => {
    //       toast({ description: 'Kayit basarili' })
    //       // setTimeout(() => router.back(), 1000)
    //       setDespatch(result as DespatchType)
    //     })
    //     .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
    // }
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      if (despatch?._id) {
        setLoading(true)
        getList(`/db/inventory?despatch=${despatch?._id}&pageSize=1000`, token)
          .then(result => {
            console.log('inventory lines:', result)
            setInventoryLines(result.docs as InventoryType[])
          })
          .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
          .finally(() => setLoading(false))
      }
    }
  }, [token])
  return (<>
    {!loading &&
      <div className="w-full">

        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className='p-1' >Stok Kartı</TableHead>
              <TableHead className="text-right">Miktar</TableHead>
              <TableHead className='p-1'>Özellikler</TableHead>
              <TableHead className="text-right">Fiyat</TableHead>
              <TableHead className="text-center">#</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryLines.map(line => (
              <TableRow key={line._id}>
                <TableCell className="font-medium">{line.item?.name}</TableCell>
                <TableCell className="text-right">{line.quantity}{line.item?.unit}</TableCell>
                <TableCell>{line.item?.itemType?.name} {line.item?.itemQuality?.name}</TableCell>
                <TableCell className="text-right">{line.price} {line.currency}</TableCell>
                <TableCell className="text-center">
                  <Link href={'#'} onClick={() => setDespatchLine(line)}><i className="fa-solid fa-edit"></i></Link>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        {despatchLine && <>
          <DespatchInventoryLine despatch={despatch} defaultValue={despatchLine} text='Satir Duzelt' />
        </>}
      </div>
    }
  </>)
}

