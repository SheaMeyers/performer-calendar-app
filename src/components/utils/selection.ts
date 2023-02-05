import { Event } from "../../interfaces"


export const isSelected = (event: Event, selected: Event[]): boolean => {
  if (!event || selected == null) return false
  return selected.indexOf(event) !== -1
}
