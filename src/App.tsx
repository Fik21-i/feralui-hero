import { useCallback, useEffect, useState } from 'react'
import { PullCord } from 'pullcord'
import 'pullcord/pullcord.css'
import '@fontsource-variable/fraunces/wght.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import './App.css'

type Theme = 'dark' | 'light'

const THEME_COLOR: Record<Theme, string> = {
  dark: '#0c0d11',
  light: '#f3ede2',
}

function getInitialTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <main className="hero">
      <div className="hero__light" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      {/* FeralUI PullCord — a physics-simulated rope. Pulling it flips the theme. */}
      <PullCord
        onPull={toggleTheme}
        pulled={theme === 'light'}
        ariaLabel="Pull to switch between dark and light theme"
      />

      <div className="hero__inner">
        <p className="hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          Built with FeralUI PullCord
        </p>

        <h1 className="hero__title">
          Interfaces you can <em>actually</em> pull on.
        </h1>

        <p className="hero__lede">
          Playful, physics-driven React components that swing, settle and respond to touch —
          so the small moments in your product feel like real things.
        </p>

        <div className="hero__actions">
          <a
            className="button button--primary"
            href="https://feralui.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore FeralUI
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            className="button button--ghost"
            href="https://feralui.dev/pullcord"
            target="_blank"
            rel="noopener noreferrer"
          >
            PullCord docs
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <p className="hero__hint">
          <span aria-hidden="true">↗</span> Go on — tug the cord to flip the lights.
        </p>
      </div>

      <p className="sr-only" role="status">
        {theme === 'dark' ? 'Dark theme on.' : 'Light theme on.'}
      </p>
    </main>
  )
}
