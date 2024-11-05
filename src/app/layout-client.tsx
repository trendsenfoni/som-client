"use client"

import React, { useEffect, useState } from "react"
// import { SessionProvider, useSession } from "next-auth/react"
import { RedirectType, redirect, usePathname, useRouter } from "next/navigation"
import { eventLog, consoleLogWelcomeMsg } from '@/lib/log'
import Cookies from 'js-cookie'
import { v4 } from 'uuid'

const LayoutClientSide = () => {
  const router = useRouter()
  const pathName = usePathname()
  const [deviceId, setDeviceId] = useState(Cookies.get('deviceId') || '')

  if (!deviceId) {
    const newDeviceId = v4()
    setDeviceId(newDeviceId)
    Cookies.set('deviceId', newDeviceId)
  }
  useEffect(() => {
    if (Cookies.get('token') && (pathName.startsWith('/auth') || pathName == '/')) {
      // if (Cookies.get('token') && pathName.startsWith('/auth')) {
      router.push('/home')
    } else if (!Cookies.get('token') && !pathName.startsWith('/auth')) {
      router.push('/auth/login')
    }
  }, [])

  return <>
    {/* <ComponentForSessionProvider /> */}
  </>
}


export default LayoutClientSide
