import React, { FC } from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

interface Props {
  children?: React.ReactNode
}

const RootPage = styled(Box)({
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const BackgroundEffect = styled(Box)({
  width: '60%',
  height: '54%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background:
    'conic-gradient(from 167.75deg at 26.05% 40.64%, rgba(207, 238, 187, 0.881587) -18.97deg, #ABE1C9 8.74deg, #80CDD7 160.76deg, #7C9CE5 225.35deg, rgba(126, 163, 230, 0.22) 298.84deg, rgba(207, 238, 187, 0.881587) 341.03deg, #ABE1C9 368.74deg)',
  filter: 'blur(150px)',
  zIndex: -999,
})

export const Layout: FC<Props> = ({ children }) => {
  return (
    <RootPage>
      <BackgroundEffect />
      {children}
    </RootPage>
  )
}
