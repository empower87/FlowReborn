export default function useRefilterProfanity() {
  const refilterProfanity = (curse: string) => {
    const regex = /(?:\w[*]+)/
    const isCurse = curse.match(regex)

    if (isCurse) {
      const curseLength = curse.length
      const firstChar = curse.charAt(0).toLowerCase()

      switch (firstChar) {
        case 'a':
          return 'asshole'
        case 'b':
          if (curseLength === 5) return 'bitch'
          else return 'bitches'
        case 'c':
          if (curseLength === 4) return 'cunt'
          else return 'cunts'
        case 'f':
          if (curseLength === 4) return 'fuck'
          else if (curseLength === 6) return 'fucked'
          else return 'fucking'
        case 'n':
          if (curseLength === 6) return 'niggas'
          else return 'niggas'
        case 'p':
          if (curseLength === 5) return 'pussy'
          else return 'pussies'
        case 's':
          return 'shit'
        default:
          console.log(curse, 'TODO: curse word caught without a handler')
          return curse
      }
    } else {
      return curse
    }
  }
  return { refilterProfanity }
}
