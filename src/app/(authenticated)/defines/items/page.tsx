"use client"

import ButtonLink from '@/components/button-link'
import { useToast } from '@/components/ui/use-toast'
import { Item } from '@/types/Item'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getList } from '@/lib/fetch'
import { PaginationType } from '@/types/PaginationType'
import Loading from '@/components/loading'
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
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Pagination from '@/components/pagination'

export default function DefinesPage() {
  const [token, setToken] = useState('')
  const [list, setList] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 10, totalDocs: 0 })
  const [search, setSearch] = useState('')

  const load = (pageNo?: number, s?: string) => {
    let url = `/db/items?pageSize=${pagination.pageSize}&page=${pageNo || pagination.page}`
    if (s != undefined) url += `&search=` + encodeURIComponent(s)

    setLoading(true)
    getList(url, token)
      .then(result => {
        setList(result.docs as Item[])
        setPagination(result as PaginationType)
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load(1, '') }, [token])

  return (<>
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-3xl ms-2'><i className="fa-solid fa-layer-group"></i> Stok Cinsleri</h1>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type='search'
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            placeholder="ara..."
            defaultValue={search}
            onChange={e => {
              setSearch(e.target.value)
              e.target.value == "" && load(1, "")
            }}
            onKeyDown={e => e.code == 'Enter' && load(1, search)}
          />
        </div>

      </div>

      <hr />
      {!loading && <>
        <Table className=''>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader >
            <TableRow >
              <TableHead>Isim</TableHead>
              <TableHead className='text-right text-nowrap'>Kdv%</TableHead>
              <TableHead className='text-right text-nowrap'>Tevk%</TableHead>
              <TableHead>Cins</TableHead>
              <TableHead>Kalite</TableHead>
              <TableHead className="text-center w-14 text-2xl">
                <ButtonLink href={`/defines/items/addnew`} type={'success'}>
                  <i className="fa-solid fa-square-plus"></i>
                </ButtonLink>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {list.map(e => (
              <TableRow key={e._id} className=''>
                <TableCell className="font-medium flex flex-col">
                  {e.name}
                  <span className='text-xs text-gray-500'>{e.description}</span>
                </TableCell>
                <TableCell className='text-right text-nowrap'>{e.vatRate}%</TableCell>
                <TableCell className='text-right text-nowrap'>{e.withHoldingTaxRate}%</TableCell>
                <TableCell>{e.itemType?.name}</TableCell>
                <TableCell>{e.itemQuality?.name}</TableCell>
                <TableCell className="flex justify-center align-middle gap1-4 text-xl">
                  <ButtonLink href={`/defines/items/${e._id}`} type=''>
                    <i className="fa-solid fa-edit"></i>
                  </ButtonLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className='bg-transparent'>
            <TableRow className=' hover:bg-transparent'>
              <TableCell colSpan={4} >
                <Pagination pagination={pagination} onPageClick={(pageNo: number) => {
                  setPagination({ ...pagination, page: pageNo })
                }} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </>}
      {loading && <div className='flex w-full h-full justify-center items-center'>
        <Loading />
      </div>}
    </div>
  </>)
}