"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { getList } from '@/lib/fetch'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { currSymbol, moneyFormat, yesterday } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { previousDay } from 'date-fns'
import { Skeleton } from "@/components/ui/skeleton"

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'

interface StoreSalesType {
  MagazaNo?: number
  Magaza?: string
  Satis?: number
  Maliyet?: number
  Kar?: number
  KarOran?: number
}

export function DashboardStoreSales() {
  const [token, settoken] = useState('')
  const [startDate, setStartDate] = useState(yesterday())
  const [endDate, setEndDate] = useState(yesterday())
  const [list, setList] = useState<StoreSalesType[]>([])
  const [total, setTotal] = useState<StoreSalesType>()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const load = () => {
    setLoading(true)
    getList(`/reports/storeSalesProfit?startDate=${startDate}&endDate=${endDate}`, token)
      .then((result: StoreSalesType[]) => {
        let t: StoreSalesType = { Satis: 0, Maliyet: 0, Magaza: 'Toplam', Kar: 0, KarOran: 0 }
        setList(result)
        result.forEach(e => {
          t.Satis = t.Satis! + e.Satis!
          t.Maliyet = t.Maliyet! + e.Maliyet!
        })
        if (t.Maliyet! > 0) {
          t.Kar = t.Satis! - t.Maliyet!
          t.KarOran = t.Kar / t.Maliyet!
        }
        setTotal(t)
      })
      .catch(err => toast({ title: 'error', description: err || '' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<>
    <Card className="flex flex-col w-full min-w-[340px]">
      <CardHeader className="items-center pb-0 px-1">
        <CardTitle className='flex flex-col s11m:f11lex-row items-ce11nter justify-be11tween w-full border-b mb-2 pb-2 gap-4'>
          <div className='self-center text-xl'>Mağaza Satış Karlılık</div>
          <div className='text-sm text-gray-400 flex w-full  justify-center '>
            <div className='flex w-f11ull justify-be11tween px-1 gap-2'>
              <Input className='px-2 py-1 w-26'
                type='date' disabled={loading} pattern='yyyy-mm-dd'
                defaultValue={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
              <Input className='px-2 py-1 w-26'
                type='date' disabled={loading} pattern='yyyy-mm-dd'
                defaultValue={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
            <Button variant={'outline'} className='px-3 py-2'
              onClick={load}><i className="fa-solid fa-rotate"></i></Button>
          </div>
        </CardTitle>
        {/* <CardDescription>10 Ekim 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col w-full pb-0 gap-2 px-2">
        <div className='grid grid-cols-5 w-full text-xs sm:text-base'>
          <div className='text-ellipsis text-nowrap'>Mağaza</div>
          <div className='text-right '>Satış</div>
          <div className='text-right '>Maliyet</div>
          <div className='text-right '>Kar</div>
          <div className='text-right w-14'>% Kar</div>
        </div>
        {loading && Array.from(Array(5).keys()).map(e => (
          <div key={e} className='flex mb-4'>
            <div className='grid grid-cols-5 w-full gap-2'>
              <Skeleton className="h-5 " />
              <Skeleton className="h-5 bg-blue-600" />
              <Skeleton className="h-5 bg-orange-600" />
              <Skeleton className="h-5 bg-green-600" />
              <Skeleton className="h-5 bg-purple-600 w-14" />
            </div>

          </div>
        ))}

        {!loading && list.map((e, index) => (
          <div key={e.Magaza} className={`grid grid-cols-5 w-full text-xs sm:text-base  ${index % 2 == 0 ? ' bg-slate-500 bg-opacity-10' : ''} py-1 ps-1`}>
            <div className='text-ellipsis text-nowrap'>{e.Magaza}</div>
            <div className='text-right text-blue-600'>{moneyFormat(e.Satis, 0)}</div>
            <div className='text-right text-orange-600'>{moneyFormat(e.Maliyet, 0)}</div>
            <div className='text-right text-green-600 font-semibold'>{moneyFormat(e.Kar, 0)}</div>
            <div className='text-right text-purple-600 font-semibold w-14'>%{Math.round(10 * (e.KarOran || 0) * 100) / 10}</div>
          </div>
        ))}
        {!loading && total && (<div>
          {/* <hr /> */}
          <div key={'total'} className='grid grid-cols-5 w-full text-xs sm:text-base font-bold bg-blue-500 bg-opacity-20 rounded-md py-1 border border-dashed border-gray-500'>
            <div className='text-ellipsis text-nowrap'></div>
            <div className='text-right text-blue-600'>{moneyFormat(total.Satis, 0)}</div>
            <div className='text-right text-orange-600'>{moneyFormat(total.Maliyet, 0)}</div>
            <div className='text-right text-green-600'>{moneyFormat(total.Kar, 0)}</div>
            <div className='text-right text-purple-600 w-14'>%{Math.round(10 * (total.KarOran || 0) * 100) / 10}</div>
          </div>
        </div>)}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">

      </CardFooter>
    </Card>
  </>)
}