export interface Itineraries {
    destination_id: string,
    user_id: string,
    date: string,
    name_of_day: string,
    activities: Array<Activities>,
    itinerary_id: string
}

interface Activities {
    activity_id?: string,
    name: string,
    place: string
}