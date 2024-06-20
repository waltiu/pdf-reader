import { useRoutes } from 'react-router-dom'
import getRoutes from './routes'


function App() {
  const element = useRoutes(getRoutes());
  return (element);
}

export default App
