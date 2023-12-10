import ReactDOM from 'react-dom/client'
import App from './components/App/App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

)
