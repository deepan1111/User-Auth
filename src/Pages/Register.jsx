import React,{useRef,useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {useAuth} from "../utils/AuthContext"
const Register = () => {
    const {user,registerUser} = useAuth()
    const registerForm = useRef(null)
    const Navigate = useNavigate()
     useEffect(()=>{
        if(user){
          Navigate('/')
        }
      })
    const handleSubmit = (e)=>{
      e.preventDefault()
      const name = registerForm.current.name.value
      const email = registerForm.current.email.value
      const password = registerForm.current.password1.value 
      const confirmPassword = registerForm.current.password2.value
      const file = registerForm.current['file'].files[0];


      if(password !== confirmPassword){
        alert("password doesn't match !!")
        return
      }

      const userInfo = {name,email,password,confirmPassword,file}
      registerUser(userInfo)
    }

  return (
    <div className="container">
      <div className="login-register-container">
        <form ref={registerForm} onSubmit={handleSubmit}>

          <div className="form-field-wrapper">
                <label>Name:</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  placeholder="Enter name..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Email:</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="Enter email..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Password:</label>
                <input 
                  type="password"
                  name="password1" 
                  placeholder="Enter password..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Confirm Password:</label>
                <input 
                  type="password"
                  name="password2" 
                  placeholder="Confirm password..."
                  />
            </div>

            <input type="file"  name="file" required />


            <div className="form-field-wrapper">

                <input 
                  type="submit" 
                  value="Register"
                  className="btn"
                  />

            </div>

            

        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>

      </div>
  </div>
  )
}

export default Register