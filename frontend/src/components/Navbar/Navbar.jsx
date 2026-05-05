import React from 'react'
import logo from '../../assets/Cardflowlogo.svg'
import profileicon from '../../assets/profileicon.svg'
import settingicon from '../../assets/settingsicon.svg'
import bellicon from '../../assets/bellicon.svg'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='navbar'>
      
      <div className='navbar-left'>
        <img src={logo} />
            
        </div>
        <div className='navbar-right'>
        <img className="bell" src={bellicon}/>
        <img className="setting" src={settingicon}/>
        <img className='profile' src={profileicon}/>
        </div>
      </div>
    
  )
}

export default Navbar
