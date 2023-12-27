import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/routes';
import firebaseApp from './config/firebase'; 


function App() {
  return (
  <>
  <RouterProvider router={router} />
  </>
  );
}

export default App;
 