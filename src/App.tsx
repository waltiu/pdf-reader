import { useRoutes } from 'react-router-dom'
import getRoutes from './routes'
import { routerGuide } from './routes/constant';


function App() {
  const element = useRoutes(getRoutes());
  return routerGuide(element);
}

export default App
