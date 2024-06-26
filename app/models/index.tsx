export type ConversationParams = {
  navigation: any
  route: any
}

export type MessageProps = {
  id: string
  content: string
  created_at: number
  user_id: string
  images: string[]
}

export type UserProps = {
  id: string
  name: string
  first_name: string
  last_name: string
  icon_url: string
  blocked: string[]
  followings: string[]
  followers: string[]
  images: string[]
  description: string
  birth_date: number

  created_at: number
}

export type ConversationProps = {
  id: string
  name: string
  boat_id: string
  created_at: number
  icon_url: string
  users: string[]
  admins: string[]
}

export type BoatProps = {
  id: string
  name: string
  number: string
  boat_type: string
  image_url: string
  owners: string[]
  crew: string[]
  club: string
  sponsors: string[]
  images: string[]
  waiting_list: string[]
  length: number
  width: number
  draft: number
  weight: number
  sail_area: number
  engine: string
  fuel: string
  water: number
  year: number
  created_at: string
}

export type EventProps = {
  id: string
  club_id: string
  name: string
  description: string
  start_date: string
  end_date: string
  created_at: string
  cover_url: string
  sponsor: string
  address: string
  city: string
  zipcode: string
  images: string[]
}
