export interface BasePerformer {
    id: number;
    name: string;
}

export interface Performer extends BasePerformer {
    hex_color: string;
}

export interface ShowPerformer extends Performer {
    showCheckbox?: boolean;
}

export interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    hex_color: string;
    url: string;
    tooltip?: string;
}
