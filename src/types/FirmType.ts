import { AddressType } from './AddressType'

export interface FirmType {
  _id?: string
  type?: string | 'customer' | 'vendor' | undefined
  name?: string
  address?: AddressType
  shippingAddress?: AddressType
  currency?: string
  itemArticle?: string
  passive?: boolean
}