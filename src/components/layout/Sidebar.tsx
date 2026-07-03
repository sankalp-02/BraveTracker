import type { Page } from '../../types/Page'


type SidebarProps = {
  currentPage: Page
  onPageChange: (page: Page) => void
}

function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>BraveTracker</h2>

      <nav>
        <button
          className={currentPage === 'dashboard' ? 'active' : ''}
          onClick={() => onPageChange('dashboard')}
        >
          Dashboard
        </button>

        <button
          className={currentPage === 'history' ? 'active' : ''}
          onClick={() => onPageChange('history')}
        >
          History
        </button>

        <button
          className={currentPage === 'statistics' ? 'active' : ''}
          onClick={() => onPageChange('statistics')}
        >
          Statistics
        </button>

        <button
          className={currentPage === 'settings' ? 'active' : ''}
          onClick={() => onPageChange('settings')}
        >
          Settings
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar