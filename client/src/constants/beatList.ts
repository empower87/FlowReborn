import beat1 from 'src/assets/audio/beatsTrack1.m4a'
import beat2 from 'src/assets/audio/beatsTrack2.m4a'
import beat3 from 'src/assets/audio/beatsTrack3.m4a'
import beat4 from 'src/assets/audio/beatsTrack4.m4a'
import beat5 from 'src/assets/audio/beatsTrack5.m4a'

export type Beat = {
  index: number
  beat: string
  title: string
}
export const beatList: Beat[] = [
  { index: 0, beat: beat1, title: 'After Dark' },
  { index: 1, beat: beat2, title: 'Futurology' },
  { index: 2, beat: beat3, title: 'Peacock' },
  { index: 3, beat: beat4, title: 'Callback' },
  { index: 4, beat: beat5, title: 'Drained' },
]
