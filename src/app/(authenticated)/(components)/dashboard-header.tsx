// "use client"

import { ThemeToggleButton } from '@/components/theme-toggle-button'
import { HeaderLogo2 } from '@/components/logo'
import CustomLink from '@/components/custom-link'
import { Input } from "@/components/ui/input"
import DashboardUserMenu from './dashboard-user-menu'
import { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function DashboardHeader({ }) {
  return (
    <header className="flex h-16 items-center justify-between bord11er-b bg-white px-0 md:px-2 dark:border-gray-800 dark:bg-gray-950"    >
      <div className="flex flex-row items-center gap-4">
        <CustomLink className="" href="/home">
          <HeaderLogo2 className='' />
        </CustomLink>
        <nav className=" hidden gap-4 text-sm font-medium md:flex">
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/home">
            <i className="fa-solid fa-house-chimney-window me-2 text-lg text-primary"></i>
            Ana Sayfa
          </CustomLink>
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/sales">
            <i className="fa-solid fa-dragon me-2 text-lg text-primary"></i>
            Satış
          </CustomLink>
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/purchasing">
            <i className="fa-solid fa-dolly me-2 text-lg text-primary"></i>
            Satın Alma
          </CustomLink>
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/inventory">
            <i className="fa-solid fa-boxes-stacked me-2 text-lg text-primary"></i>
            Stok
          </CustomLink>
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/defines">
            <i className="fa-solid fa-list-check me-2 text-lg text-primary"></i>
            Tanımlar
          </CustomLink>

        </nav>
      </div>
      <div className="flex items-center gap-2">
        <DashboardUserMenu />
        <div className='flex md:hidden'><MobileMenu /></div>

      </div>
    </header>
  )
}

function MobileMenu() {
  return (<>
    <DropdownMenu >
      <DropdownMenuTrigger asChild  >
        <Button className="rounded-full border border-gray-200 w-12 h-12 dark:border-gray-800"
          size="icon"
          variant="ghost"
        >
          <i className="fa-solid fa-bars"></i>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        <DropdownMenuItem>
          <CustomLink className="rounded-md  py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/home">
            <i className="fa-solid fa-house-chimney-window me-2 text-lg text-primary"></i>
            Ana Sayfa
          </CustomLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomLink className="rounded-md  py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/sales">
            <i className="fa-solid fa-dragon me-2 text-lg text-primary"></i>
            Satış
          </CustomLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomLink className="rounded-md  py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/purchasing">
            <i className="fa-solid fa-dolly me-2 text-lg text-primary"></i>
            Satın Alma
          </CustomLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomLink className="rounded-md py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/inventory">
            <i className="fa-solid fa-boxes-stacked me-2 text-lg text-primary"></i>
            Stok
          </CustomLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomLink className="rounded-md  py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/defines">
            <i className="fa-solid fa-list-check me-2 text-lg text-primary"></i>
            Tanımlar
          </CustomLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem >
          <Link href="/settings" className='flex items-center'>
            <i className='fa-solid fa-gears me-2 text-lg'></i>
            Ayarlar
          </Link>
        </DropdownMenuItem> */}

      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}