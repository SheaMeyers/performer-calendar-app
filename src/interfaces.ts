export interface BasePerformer {
    id: string
    name: string
}

export interface Performer extends BasePerformer {
    hexColor: string
}

export interface ShowPerformer extends Performer {
    showCheckbox?: boolean
}

export interface Event {
    id: string
    title: string
    start: string | Date
    end: string | Date
    hexColor: string
    url: string
    location: string
    tooltip?: string
    border?: string
}
