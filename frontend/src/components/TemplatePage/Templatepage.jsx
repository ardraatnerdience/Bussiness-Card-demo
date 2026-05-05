import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/User/Sidebar'
import { useState } from 'react'

const Templatepage = () => {
  const [active, setActive] = useState("template");

  return (
    <div>
        <Navbar />
      <Sidebar active={active} setActive={setActive} />
      <h1>template page</h1>
    </div>
  )
}

export default Templatepage
