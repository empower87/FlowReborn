/// <reference types="react-scripts" />
declare module "*.m4a" {
  const src: string
  export default src
}

declare module "datamuse" {
  const datamuse: any
  export default datamuse
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module "wordpos" {
  const wordpos: any
  export default wordpos
}
