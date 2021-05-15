export interface Story {
  by: string,
  descendants: number,
  id: number,
  kids: number[],
  score: number,
  time: number,
  text?: string,
  title: string,
  type: string,
  url: string,
  metadata?: {
    image?: string,
    logo?: string,
    publisher?: string
  }
  hostname?: string,
}
