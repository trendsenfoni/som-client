"use client"
import React, { FC, useEffect, useState } from 'react'
import { Metadata } from 'next/types'
import pageMeta from '@/lib/meta-info'
import Cookies from 'js-cookie'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { DatabaseType } from '@/types/DatabaseType'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Props {
  params: {
    id: string
  }
}
const DatabasesPage: FC<Props> = ({ params }) => {
  console.log('params:', params)
  const router = useRouter()
  const [token, setToken] = useState('')
  const [database, setDatabase] = useState<DatabaseType | null>(null)

  const save = () => {
    putItem(`/databases/${params.id}`, token, database)
      .then(result => {
        router.push('/databases')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      getItem(`/databases/${params.id}`, token)
        .then(result => {
          setDatabase(result as DatabaseType)
        })
        .catch(err => console.log(err))
    }
  }, [token])
  return (<>
    <div className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <Label>Name</Label>
          <Input defaultValue={database?.name} onChange={e => setDatabase({ ...database, name: e.target.value })} />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Identifier</Label>
          <Input defaultValue={database?.identifier} onChange={e => setDatabase({ ...database, identifier: e.target.value })} />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>dbName</Label>
          <Input defaultValue={database?.dbName} onChange={e => setDatabase({ ...database, dbName: e.target.value })} />
        </div>

      </div>

      <div className='w-full flex flex-row justify-end gap-4'>
        <Button variant={'secondary'} onClick={() => router.back()}><i className="fa-solid fa-angle-left text-2xl"></i></Button>
        <Button onClick={save} ><i className="fa-solid fa-check text-2xl"></i></Button>
      </div>
    </div>
  </>
  )
}

export default DatabasesPage