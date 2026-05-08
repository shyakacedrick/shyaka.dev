// Mocking a backend response — Full Stack Open Part 2 pattern
// In a real app this would be replaced by an axios/fetch call to an API endpoint

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    year: '2024',
    description:
      'A scalable online store built with React, Node.js and PostgreSQL featuring real-time inventory management.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    color: '#111111',
  },
  {
    id: 2,
    title: 'Design System',
    category: 'UI/UX',
    year: '2024',
    description:
      'A comprehensive component library with Storybook documentation, accessibility-first and fully themeable.',
    tech: ['React', 'TypeScript', 'Storybook'],
    color: '#0d0d0d',
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    category: 'Frontend',
    year: '2023',
    description:
      'Real-time data visualization platform with D3.js charts, WebSocket feeds and custom drill-down filters.',
    tech: ['React', 'D3.js', 'WebSockets'],
    color: '#111111',
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    category: 'Mobile',
    year: '2023',
    description:
      'Cross-platform fintech application with biometric authentication, transaction history and budget tracking.',
    tech: ['React Native', 'Redux', 'Firebase'],
    color: '#0d0d0d',
  },
]

export default projects
