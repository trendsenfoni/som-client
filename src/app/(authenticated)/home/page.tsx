"use client"

import { useState } from 'react'
// import { DashboardBankBalances } from './dashboard-bankBalances'
// import { DashboardBestProductSales } from './dashboard-bestProductSales'
// import { DashboardCashBalances } from './dashboard-cash-balances'
// import { DashboardProductMainGroupSales } from './dashboard-productMainGroupSales'
// import { DashboardStoreSales } from './dashboard-storeSales'
import { PieCart1 } from './pie-chart'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'


export default function Home() {
  const [report, setReport] = useState('caseBank')
  return (
    <div className='container px-0 py-4 flex flex-col gap-4'>
      <h1>Ana Sayfa</h1>

      <Button className='' variant={'default'}>Deneme</Button>

    </div>
  )
}
