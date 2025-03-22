// While using navbar and signout,if you try to comeback it coming back to the landing page.
import React from 'react'
import Navbar from './Navbar'

const Landingpage = () => {
  return (
    <div>
      <Navbar/>
      <h1>landing Page</h1>
      <button>grocery</button>
      <button>saloon</button>
      <button>renting</button>
      <button>service</button>
    </div>
  )
}

export default Landingpage
