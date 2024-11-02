import Link from 'next/link'

export type IconProps = React.HTMLAttributes<SVGElement> & { width?: number, height?: number }

export const HeaderLogo2 = ({
  className,
}: { className?: string }) => {
  return (
    <div className={`flex flex-row te11xt-2xl max-h-6 mt-1   ${className}`}>
      <img className='aspect-auto max-h-6' src={'/img/logo.png'} alt={'GuvenSac'} />
      {/* <div className='bg-[#146FDB] text-white p-1 pt-2 border-l border-y bor11der-gray-400 rounded-tl-md rounded-bl-md  font-semibold relative'>
        GÜVEN
      </div>
      <div className='bg-yellow-600 text-white p-1 pt-2 border-r border-y bor11der-gray-400 rounded-tr-md rounded-br-md font-semibold'>
        SAC
      </div> */}
    </div>
  )
}