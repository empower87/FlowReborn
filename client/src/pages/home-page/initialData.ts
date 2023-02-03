// import { faker } from '@faker-js/faker'
// import { IUser } from "../../../../server/src/models/User"
import { IUser } from "src/types/ServerModelTypes"

export const tempMockSong = {
  _id: "100",
  title: "",
  createdOn: new Date(),
  caption: "",
  duration: 0,
  audio: "",
  lyrics: [],
  user: {
    _id: "3",
    username: "pizzle",
    email: "mpizzle@gmail.com",
    followers: [],
    following: [],
    likes: [],
  },
  comments: [],
  likes: [],
  video: "",
}
const ids = ["100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110"]
const songIds = [
  "1000",
  "1001",
  "1002",
  "1003",
  "1004",
  "1005",
  "1006",
  "1007",
  "1008",
  "1009",
  "1010",
  "1011",
  "1012",
  "1013",
  "1014",
  "1015",
  "1016",
  "1017",
  "1018",
  "1019",
]
export const tempMockUser: IUser = {
  _id: "3",
  username: "pizzle",
  email: "mpizzle@gmail.com",
  followers: [],
  following: [],
}

// const generateSongs = (songIds: string[], users: any) => {
//   let songs = []
//   for (let i = 0; i < songIds.length; i++) {
//     const randomUser = Math.floor(Math.random() * users.length - 1)
//     const randomLyrics = Math.floor(Math.random() * 50)
//     songs.push({
//       _id: songIds[i],
//       title: faker.music.songName(),
//       createdOn: faker.date.recent(10),
//       caption: faker.lorem.sentence(1),
//       duration: i * 500,
//       audio: '',
//       lyrics: generateLyrics(randomLyrics),
//       user: users[randomUser],
//       comments: generateComments(randomUser, users, songIds[i]),
//       likes: [],
//       video: '',
//     })
//   }
//   return songs
// }

// const generateLyrics = (count: number) => {
//   let lyrics = []
//   for (let i = 0; i < count; i++) {
//     lyrics.push([faker.lorem.sentence()])
//   }
//   return lyrics
// }

// const generateComments = (count: number, users: any, songId: string) => {
//   let comments = []
//   for (let i = 0; i < count; i++) {
//     const randomUser = Math.floor(Math.random() * users.length - 1)
//     comments.push({
//       _id: faker.datatype.uuid(),
//       createdOn: faker.date.recent(10),
//       text: faker.lorem.lines(),
//       user: users[randomUser],
//       // song: songId,
//       likes: [],
//       replies: [],
//     })
//   }
//   return comments
// }

// const generateUsers = (ids: string[]) => {
//   let users = []

//   for (let i = 0; i < ids.length; i++) {
//     users.push({
//       _id: ids[i],
//       username: faker.word.noun(7),
//       email: faker.internet.email(),
//       given_name: faker.name.firstName(),
//       family_name: faker.name.lastName(),
//       picture: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`,
//       about: faker.lorem.sentence(),
//       location: faker.address.city(),
//       followers: [],
//       following: [],
//       likes: [],
//     })
//   }
//   return users
// }

const generateRandomSocials = (users: any) => {
  let randomNum = Math.floor(Math.random() * ids.length)
  let randomIds = []
  for (let i = 0; i < randomNum; i++) {
    randomIds.push(users[randomNum])
  }
}

// export const generateSongArray = () => {
//   let users = generateUsers(ids)
//   let songs = generateSongs(songIds, users)

//   return songs
// }
