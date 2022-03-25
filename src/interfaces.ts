export interface BasePerformer {
    id: number
    name: string
}

export interface Performer extends BasePerformer {
    hexColor: string
}

export interface ShowPerformer extends Performer {
    showCheckbox?: boolean
}

export interface Event {
    id: number
    title: string
    start: string | Date
    end: string | Date
    hexColor: string
    url: string
    tooltip?: string
    border?: string
}
