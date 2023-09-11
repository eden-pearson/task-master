import { Route, createRoutesFromElements } from 'react-router-dom'

import App from './components/App.tsx'
import Home from './components/Home.tsx'
import UserForm from './components/UserForm.tsx'
import LandingPage from './components/LandingPage.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/register" element={<UserForm />} />
    <Route path="/login" element={<LandingPage />} />
  </Route>
)
