import * as React from 'react'
import { Box, Container, Typography } from '@mui/material'
import backgroundImg from './AdobeStock_198204335.jpeg'
import { useIsDesktop } from './useIsDesktop'
import TransparentBackgroundImage from './TransparentBackgroundImage'

export default function SecondModuleComponent() {
  const isDesktop = useIsDesktop()

  const TextBox = () => (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        width={{ md: '70%' }}
        mb={{ xs: 4 }}
      >
        <Typography
          variant="h1"
          pt={{ xs: 3.5, md: 10.38 }}
          color={'black'}
        >
          Neben dem Klima schützen wir auch dich & dein Geld.
        </Typography>
        <Typography variant="body1" color={{ md: 'black' }}>
          Mit Corona leider wichtig geworden: Wenn etwas dazwischen kommt, ist
          dein Geld zu 100% abgesichert. Und dir bieten wir 24/7
          Notfallbetreuung. Und für 30€ extra kannst du bis 22 Tage vor Abreise
          kosten- und grundlos stornieren.
        </Typography>
      </Box>
    </Container>
  )

  return (
    <>
      <TransparentBackgroundImage
        url={backgroundImg}
        opacity={isDesktop ? 0.8 : 1}
        sx={{
          backgroundSize: { xs: 'cover', md: '170%', lg: '140%' },
          backgroundPosition: {
            xs: 'bottom',
            md: '33% 70%',
            lg: '33% 25%',
            xl: '10% 55%',
          },
        }}
        height={{ xs: 312, md: 660 }}
      >
        {isDesktop && <TextBox />}
      </TransparentBackgroundImage>
      {!isDesktop && <TextBox />}
    </>
  )
}