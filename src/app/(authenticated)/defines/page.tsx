import ButtonLink from '@/components/button-link'

export default function DefinesPage() {

  return (<>
    <h1>Tanimlar</h1>
    <hr />
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <ButtonLink>Stok Cinsleri</ButtonLink>
      <ButtonLink>Kalite Tanımları</ButtonLink>
    </div>
  </>)
}