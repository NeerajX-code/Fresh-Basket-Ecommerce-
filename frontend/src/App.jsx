import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import MainRoutes from './routes/mainRoutes'
import { asyncCurrentUser } from './store/actions/userActions';
import { useEffect } from 'react';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncCurrentUser());
  }, [dispatch])

  return (
    <div className='p-4 h-screen bg-[#074d4d] backdrop-blur-lg flex flex-col gap-2 overflow-hidden text-white'>
      <Navbar />
      <MainRoutes />
    </div>
  )
}

export default App