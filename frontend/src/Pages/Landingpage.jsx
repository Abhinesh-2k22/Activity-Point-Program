// While using navbar and signout,if you try to comeback it coming back to the landing page.
import React from 'react'
import Navbar from './Navbar'
import { Link,useNavigate } from 'react-router-dom';

const Landingpage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar/>
      <h1>landing Page</h1>
      {/* abhi */}
      <Link to ='/grocery'>grocery</Link>
      <Link to ='/getrenting'>renting</Link>
      {/* akshay */}
      <button>saloon</button>
      <Link to ='/getservice'>Service</Link>
    </div>
  )
}

export default Landingpage
