import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shell from './pages/Shell'
import PrivateSetup from './pages/PrivateSetup'
import ForAgencies from './pages/ForAgencies'
import ForOperators from './pages/ForOperators'
import Pricing from './pages/Pricing'
import Builder from './pages/Builder'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shell" element={<Shell />} />
      <Route path="/private-setup" element={<PrivateSetup />} />
      <Route path="/for-agencies" element={<ForAgencies />} />
      <Route path="/for-operators" element={<ForOperators />} />
      <Route path="/communication-audit" element={<div>Communication Audit (Coming Soon)</div>} />
      <Route path="/replycontrol" element={<div>ReplyControl Dashboard (Coming Soon)</div>} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/builder" element={<Builder />} />
    </Routes>
  )
}

export default App
