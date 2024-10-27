import Link from "next/link"
import { Button } from '@/components/ui/button'
import { useRouter, redirect, RedirectType } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Separator } from '@/components/ui/separator'
import HorizontalLineWithText from '@/components/horizontal-line-with-text'
import ThemeToggleButton from '@/components/theme-toggle-button'
import { HeaderLogo2 } from '@/components/logo'
import MagicLinkSignIn from '../(components)/magic-link-signin'
import EmailPasswordSignIn from '../(components)/email-password-signin'
import SSOSignIn from '../(components)/sso-signin'
import { postItem } from '@/lib/fetch'
import Loading from '@/components/loading'

// export const metadata: Metadata = pageMeta('Login')



export default function LoginPage() {
  return (<div className='relative flex-1 w-full h-screen max-h-full items-center justify-center'>

    {/* <div className=' h-full flex items-center justify-center w-full mt-0 md:mt-0'> */}

    {/* <div className="w-full  mb-6 text-2xl max-w-[450px] space-y-4"> */}

    <div className='absolute top-[calc(50%-125px)] start-[calc(50%-175px)] flex flex-col'>

      <div className='rounded-lg border border-dashed border-opacity-50 border-slate-400 p-4 space-y-4  w-[350px] h-[200px] flex flex-col'>
        <h1 className='text-3xl self-center'>Giriş</h1>
        {/* <Label >Admin Email</Label> */}
        <EmailPasswordSignIn />

      </div>
    </div>
    {/* </div> */}
    {/* </div> */}
  </div>)
}
