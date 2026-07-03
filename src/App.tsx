import { useState } from 'react'

import './App.css'

import Sidebar from './components/layout/Sidebar'

import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'

import type { Page } from './types/Page'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  function renderPage() {
    switch (currentPage) {
      case 'history':
        return <History />

      case 'statistics':
        return <Statistics />

      case 'settings':
        return <Settings />

      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <main className="content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App