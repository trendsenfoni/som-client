"use client"
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getItem, postItem } from '@/lib/fetch'
import { DatabaseType } from '@/types/DatabaseType'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"

const DatabasesPage = () => {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [database, setDatabase] = useState<DatabaseType>({})
  const { toast } = useToast()
  const save = () => {
    postItem('/databases', token, database)
      .then(result => {
        router.push('/databases')
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive', duration: 1000 }))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])

  return (<>
    <div className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <Label>identifier</Label>
          <Input defaultValue={database?.identifier} onChange={e => setDatabase({ ...database, identifier: e.target.value })} />
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