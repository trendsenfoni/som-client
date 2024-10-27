"use client"
import React, { useEffect, useState } from 'react'
import { Metadata } from 'next/types'
import pageMeta from '@/lib/meta-info'
import Cookies from 'js-cookie'
import { getItem, postItem } from '@/lib/fetch'
import { DatabaseType } from '@/types/DatabaseType'
import Link from 'next/link'
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
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
const DatabasesPage = () => {
  const [token, setToken] = useState('')
  const [databases, setDatabases] = useState<DatabaseType[]>([])
  const { toast } = useToast()
  const router = useRouter()
  const dbId = Cookies.get('dbId') || ''

  const changeDb = (dbId: string) => {
    postItem(`/session/change/db/${dbId}`, token, {})
      .then(result => {
        console.log(result)
        Cookies.set('dbList', JSON.stringify(result.dbList || []))
        Cookies.set('db', JSON.stringify(result.db || null))
        Cookies.set('dbId', result.dbId || '')
        router.refresh()
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive', duration: 1000 }))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      getItem('/databases', token)
        .then(result => {
          console.log('result:', result)
          setDatabases(result.docs as DatabaseType[])
        })
        .catch(err => console.log(err))
    }
  }, [token])
  return (<>
    <div className='space-y-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-full'>Name</TableHead>
            <TableHead className="text-center w-[60px]">#</TableHead>
            <TableHead className="text-center w-[60px]">#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {databases && databases.map((e: DatabaseType) => (
            <TableRow key={e._id} className={`${e._id == dbId ? 'text-[#777]' : ''}`}>
              <TableCell className='flex items-center gap-2 w-auto'><i className="fa-solid fa-database"></i> {e.identifier}</TableCell>
              <TableCell className="text-center w-[60px] text-xl">
                <Link href={`/databases/edit/${e._id}`} title='Edit'>
                  <i className="fa-solid fa-edit"></i>
                </Link>
              </TableCell>
              <TableCell className="text-center w-[60px] text-xl">
                {e._id == dbId && <div>
                  <i className="fa-solid fa-check-double"></i>
                </div>}
                {e._id != dbId && <>
                  <Button variant={'outline'} onClick={() => changeDb(e._id || '')}>
                    <i className="fa-solid fa-check"></i>
                  </Button>
                </>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='mt-8 flex justify-end'>
        <Link href="/databases/addnew" className='bg-primary text-primary-foreground text-2xl py-2 px-3 rounded-md' >
          <i className='fa-solid fa-square-plus ' />
        </Link>
      </div>

    </div>
  </>
  )
}

export default DatabasesPage