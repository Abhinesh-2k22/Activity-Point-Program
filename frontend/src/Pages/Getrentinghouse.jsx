import React from 'react'

const Getrentinghouse = () => {

  const userdetail=async (e) => {
    e.preventDefault();
    try {
        const cookieresponse = await fetch('http://localhost:8000/api/auth/cookie', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
  
        const userdata = await cookieresponse.json();
        
        if (cookieresponse.ok) {
            console.log('user details obtained:', userdata);
          } else {
            console.error('user details not obtained', userdata.message);
          }

        let apiEndpoint = "";

        if(userdata.user.role === "renting_broker"){
          apiEndpoint = 'http://localhost:8000/api/user/myhouse';
        }else{
          apiEndpoint = 'http://localhost:8000/api/user/renthouse';
        }
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials:'include'
        });

        const data = await response.json();

        if (response.ok) {
            console.log('House details obtained:', data);
          } else {
            console.error('House details not obtained', data.message);
          }  
        } catch (error) {
          console.error('Error during token_decoding:', error);
        }
    }

  return (
    <div>
      hi
      <button onClick={userdetail}>check</button>
    </div>
  )
}

export default Getrentinghouse
