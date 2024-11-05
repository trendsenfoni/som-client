import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { InventoryType } from '@/types/InventoryType'
import { DespatchType } from '@/types/DespatchType'
import { getItem } from '@/lib/fetch'
import { ComboboxItemList } from './combobox-items'
import { moneyFormat } from '@/lib/utils'

interface Props {
  className?: string
  text?: string
  defaultValue?: InventoryType
  despatch?: DespatchType
  children?: any
  onOk?: () => void
  onCancel?: () => void
}

export function DespatchInventoryLine({
  className,
  text,
  children,
  onOk,
  onCancel,
  defaultValue,
  despatch
}: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [inventory, setInventory] = useState<InventoryType | undefined>(defaultValue)

  return (<div className='flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-2 rounded-md'>
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <div>
        <Label>Stok Kartı {inventory?.item?.name}</Label>
        <ComboboxItemList width='w-[300px]' defaultValue={inventory?.item} onChange={e => setInventory({ ...inventory, item: e })} />
      </div>
      <div>
        <Label>Miktar ({inventory?.item?.unit})</Label>
        <Input value={inventory?.quantity} readOnly />
      </div>
      <div>
        <Label>Ağırlık</Label>
        <Input defaultValue={inventory?.weight} onChange={e => {
          let val = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
          setInventory({ ...inventory, weight: val, quantity: val / 1000 })
        }} />
      </div>
      <div>
        <Label>Fiyat</Label>
        <Input defaultValue={inventory?.price} onChange={e => {
          let val = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
          setInventory({ ...inventory, price: val })
        }} />
      </div>
      <div className='flex flex-col gap-2'>
        <Label>Tutar</Label>
        <Label>{moneyFormat(inventory?.total || 0, 2)}</Label>
      </div>
    </div>
    <div className='flex justify-end'>
      <Button variant={'outline'}><i className='fa-solid fa-check'></i></Button>
    </div>
  </div>
  )
}