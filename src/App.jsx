import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Stats from './components/Stats/Stats'
import About from './components/About/About'
import Services from './components/Services/Services'
import Work from './components/Work/Work'
import Contact from './components/Contact/Contact'
import Background from './components/Background/Background'
import Cursor from './components/Cursor/Cursor'
import projects from './services/projects'
import styles from './App.module.css'

const App = () => {
  const [projectList, setProjectList] = useState([])
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    // Replace with: axios.get('/api/projects').then(res => setProjectList(res.data))
    setProjectList(projects)
  }, [])

  return (
    <div className={styles.app}>
      <Background />
      <Cursor />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Work projects={projectList} />
      <Contact />
    </div>
  )
}

export default App
