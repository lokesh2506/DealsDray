import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {ContextProvider} from './contextApi/contextProvider.jsx'
import axios from 'axios';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { EmployeeContext, EmployeeProvider } from './contextApi/Employee.jsx'

axios.defaults.baseURL="http://localhost:3000"
axios.defaults.withCredentials=true;
const queryClient=new QueryClient();

createRoot(document.getElementById('root')).render(
 <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <ContextProvider>
    <EmployeeProvider>
      <App/>
    </EmployeeProvider>
    </ContextProvider>
 </BrowserRouter>
 </QueryClientProvider>
)
