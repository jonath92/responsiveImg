import { Box } from '@mui/material'
import React from 'react'

interface Properties extends React.ComponentProps<typeof Box> {
  url: string
  /** opacity between 0 and 1 like normally in css but in contrast to normal css this is only applied to the background */
  opacity: number
}

/** A simple container which allows to set a background image with opacity without impacting the content above. Based on: https://stackoverflow.com/a/17945428/11603006 */
export default function TransparentBackgroundImage(props: Properties) {
  const { url, opacity, children, ...rest } = props

  const transparency = (1 - opacity).toFixed(1)

  return (
    <Box
      {...rest}
      sx={{
        ...rest?.sx,
        background: `linear-gradient(to bottom, rgba(255,255,255, ${transparency}) 0%,rgba(255,255,255,${transparency}) 100%), url(${url}) repeat 0 0`,
      }}
    >
      {children}
    </Box>
  )
}
