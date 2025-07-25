import { PropsWithChildren } from "react"
type LayoutProps = {
  classes: string[]
  children?: JSX.Element | JSX.Element[]
}

export const LayoutTwo = ({ classes, children }: LayoutProps) => {
  return (
    <div className={classes[0]}>
      <div className={classes[1]}>{children}</div>
    </div>
  )
}

export const LayoutThree = ({ classes, children }: LayoutProps) => {
  return (
    <div className={classes[0]}>
      <div className={classes[1]}>
        <div className={classes[2]}>{children}</div>
      </div>
    </div>
  )
}

// class
// shallow vs. deep = 1px 1px 2px vs. 2px 2px 3px

type ContainerProps = PropsWithChildren<{
  specs:
    | "inset row round"
    | "inset row square"
    | "inset col round"
    | "inset col square"
    | "outset row round"
    | "outset row square"
    | "outset col square"
    | "outset col round"
  classes: string[]
  dim: string[]
  background?: string | undefined
}>

export const Container = ({ specs, classes, dim, background, children }: ContainerProps) => {
  const container = {
    height: dim[0],
    width: dim[1],
    background: background,
  }
  // const containerChild = {
  //   height: dim[2],
  //   width: dim[3],
  // }

  return (
    <div className={`Container ${classes[0]}`} style={container}>
      <div className={`Container-child ${specs} ${classes[1]}`} style={{ height: dim[2], width: dim[3] }}>
        {children}
      </div>
    </div>
  )
}
