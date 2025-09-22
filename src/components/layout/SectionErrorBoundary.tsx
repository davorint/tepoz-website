'use client'

import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  sectionId: string
  onError?: () => void
}

interface State {
  hasError: boolean
}

export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in section ${this.props.sectionId}:`, error, errorInfo)
    this.props.onError?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[200px] flex items-center justify-center bg-muted/50">
          <div className="text-center text-muted-foreground">
            <p>Section temporarily unavailable</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}