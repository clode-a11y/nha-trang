'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { trackEvent } from './Analytics'

type Variant = 'A' | 'B'

interface ABTestContextType {
  getVariant: (testName: string) => Variant
  trackConversion: (testName: string) => void
}

const ABTestContext = createContext<ABTestContextType | null>(null)

export function ABTestProvider({ children }: { children: ReactNode }) {
  const [variants, setVariants] = useState<Record<string, Variant>>({})

  useEffect(() => {
    // Load variants from localStorage or assign new ones
    const stored = localStorage.getItem('ab_variants')
    if (stored) {
      setVariants(JSON.parse(stored))
    }
  }, [])

  const getVariant = (testName: string): Variant => {
    if (variants[testName]) {
      return variants[testName]
    }

    // Assign random variant
    const variant: Variant = Math.random() < 0.5 ? 'A' : 'B'
    const newVariants = { ...variants, [testName]: variant }
    setVariants(newVariants)
    localStorage.setItem('ab_variants', JSON.stringify(newVariants))

    // Track variant assignment
    trackEvent('ab_test_assigned', testName, variant)

    return variant
  }

  const trackConversion = (testName: string) => {
    const variant = variants[testName]
    if (variant) {
      trackEvent('ab_test_conversion', testName, variant)
    }
  }

  return (
    <ABTestContext.Provider value={{ getVariant, trackConversion }}>
      {children}
    </ABTestContext.Provider>
  )
}

export function useABTest(testName: string) {
  const context = useContext(ABTestContext)
  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider')
  }

  const [variant, setVariant] = useState<Variant>('A')

  useEffect(() => {
    setVariant(context.getVariant(testName))
  }, [context, testName])

  return {
    variant,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
    trackConversion: () => context.trackConversion(testName)
  }
}

// A/B Test component wrapper
interface ABTestProps {
  testName: string
  variantA: ReactNode
  variantB: ReactNode
}

export function ABTest({ testName, variantA, variantB }: ABTestProps) {
  const { isVariantA } = useABTest(testName)
  return <>{isVariantA ? variantA : variantB}</>
}

// Example A/B tests for the site
export const AB_TESTS = {
  CTA_BUTTON: 'cta_button_color', // Green vs Gradient
  HERO_LAYOUT: 'hero_layout', // Map left vs Map right
  PRICING_DISPLAY: 'pricing_display', // With currency vs Without
  CHATBOT_POSITION: 'chatbot_position' // Bottom right vs Bottom left
}
