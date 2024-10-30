"use client"

import ButtonLink from '@/components/button-link'

export default function DefinesPage() {

  return (<>
    <h1>Tanimlar</h1>
    <hr />
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-4'>
      <ButtonLink href='/defines/itemTypes'><i className="fa-solid fa-layer-group"></i> Stok Cinsleri</ButtonLink>
      <ButtonLink href='/defines/itemQualities'><i className="fa-solid fa-medal"></i> Kalite Tanımları</ButtonLink>
      <ButtonLink href='/defines/items'><i className="fa-solid fa-cart-flatbed"></i> Stok Kartları</ButtonLink>
      <ButtonLink href='/defines/firms/customers'><i className="fa-solid fa-building-user"></i> Müşteriler</ButtonLink>
      <ButtonLink href='/defines/firms/vendors'><i className="fa-solid fa-building-wheat"></i> Tedarikçiler</ButtonLink>
    </div>
  </>)
}