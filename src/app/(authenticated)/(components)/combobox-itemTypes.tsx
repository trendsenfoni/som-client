"use client"
import { useEffect, useState } from 'react'

import { Check, ChevronsUpDown } from "lucide-react"
import { getList } from '@/lib/fetch'
import { showError } from '@/lib/showToast'
import { ItemType } from '@/types/ItemType'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Cookies from 'js-cookie'

interface Props {
  defaultValue?: ItemType
  onChange?: (val: ItemType) => void
}
export function ComboboxItemTypeList(props: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [token, settoken] = useState('')
  const [obj, setObj] = useState<ItemType | undefined>(props.defaultValue)
  const [list, setList] = useState<ItemType[]>([])
  // const [value, setValue] = useState("")
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const load = (s?: string) => {
    setLoading(true)
    getList(`/db/itemTypes?pageSize=10&search=${s || search || ''}`, token)
      .then(result => {
        setList(result.docs as ItemType[])
      })
      .catch(showError)
      .finally(() => setTimeout(() => setLoading(false), 400))
  }

  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])
  useEffect(() => { token && load() }, [token, search])

  return (<>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {obj ? obj?.name : "Seçiniz..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={`ara...`}
            value={search}
            onValueChange={e => {
              setSearch(e)
            }}
          />

          <CommandList>
            <CommandEmpty>Cins bulunamadı</CommandEmpty>
            <CommandGroup>
              {list.map(e => (
                <CommandItem
                  key={e._id}
                  value={e.name}
                  onSelect={e => {
                    console.log('onSelect e:', e)
                    setObj(list.find(k => k.name == e))
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      obj?._id === e._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {e.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </>)
}