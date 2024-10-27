import { ItemQuality } from './ItemQuality'
import { ItemType } from './ItemType'

export interface Item {
  _id?: string
  itemType?: ItemType
  itemQuality?: ItemQuality
  name?: string
  description?: string
  passive?: boolean
}