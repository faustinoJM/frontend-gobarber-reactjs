import React, { ReactNode } from 'react'
import { Container } from './style'

interface TooltipProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ToolTip({ className, title, children}: TooltipProps) {
  return(
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )

}