"use client"
import { useEffect, useState } from 'react'

import { Check, ChevronsUpDown } from "lucide-react"
import { getList } from '@/lib/fetch'
import { FirmType } from '@/types/FirmType'
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
import { useToast } from '@/components/ui/use-toast'

interface Props {
  type?: string | 'customer' | 'vendor'
  defaultValue?: FirmType
  onChange?: (val?: FirmType) => void
  width?: string
}
export function ComboboxFirmList({
  type,
  defaultValue,
  onChange,
  width = "w-300px"
}: Props) {
  const [open, setOpen] = useState(false)
  const [token, settoken] = useState('')
  const [obj, setObj] = useState<FirmType | undefined>(defaultValue)
  const [list, setList] = useState<FirmType[]>([])
  const [search, setSearch] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const load = (s?: string) => {

    setLoading(true)
    getList(`/db/firms?type=${type}&pageSize=10&search=${s || search || ''}`, token)
      .then(result => {
        setList(result.docs as FirmType[])
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])
  useEffect(() => { token && load() }, [token, search])

  return (<div>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {!loading &&
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`${width} justify-between`}
          >
            {obj ? obj?.name : "Seçiniz..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        }
      </PopoverTrigger>

      <PopoverContent className={`${width} p-0`}>
        <Command>
          <CommandInput
            placeholder={`...`}
            value={search}
            onValueChange={e => {
              setSearch(e)
            }}
          />

          <CommandList>
            <CommandEmpty>Kayıt bulunamadı</CommandEmpty>
            <CommandGroup>
              {list.map(e => (
                <CommandItem
                  key={e._id}
                  value={e.name}
                  onSelect={e => {
                    let choosen = list.find(k => k.name == e)
                    setObj(choosen)
                    if (onChange) onChange(choosen)
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
  </div>)
}