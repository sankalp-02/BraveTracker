import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>BraveTracker</h2>

        <nav>
          <button>Dashboard</button>
          <button>History</button>
          <button>Statistics</button>
          <button>Settings</button>
        </nav>
      </aside>

      <main className="content">
        <h1>Dashboard</h1>

        <p>
          Welcome to BraveTracker.
        </p>

        <p>
          This is the starting point of our application.
        </p>
      </main>
    </div>
  )
}

export default App