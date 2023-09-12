import React, { useEffect, useState } from 'react'
import { Alert, Col } from 'react-bootstrap'
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon
} from 'mdb-react-ui-kit';
import Repository from '../../services/Repository';
import Conn from '../../services/Conn';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { ic_facebook } from 'react-icons-kit/md/ic_facebook'
import Icon from 'react-icons-kit';

import Box from '../imgz/200w.webp'

function LoggedInPage() {

  const [userName, setUsername] = useState()
  const [password, setPassword] = useState()
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginClick, setLoginClick] = useState(false)

  const signIn = useSignIn()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.backgroundColor = '#0d2813fa'
    console.log('===========' )
    console.log(localStorage.getItem('catname') )
  })

  const loginHandler = (e) => {
    e.preventDefault()
    const AuthRequest = {
      userName: userName,
      password: password
    }

    try {
      const response = Repository.Login(AuthRequest).then((res) => {
        console.log('Login status below')
        setLoginClick(true)
        if (res.data.stat !== 'fail') {
          console.log('---------------------user ---------------------')
          console.log(res.data.token)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userid', res.data.userDetails.id)
          localStorage.setItem('catname', res.data.userDetails.catname)

          setLoginStatus(true)
          signIn({
            token: res.data,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: { username: AuthRequest.userName }
          })
          const token = localStorage.getItem('token');
          if (token) {
            window.location.replace('/reporting')
          }
        } else {

          setLoginStatus(false)

        }
      })
    } catch (err) {

    }

  }


  const loginNg = {
    // background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', 
    background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 25%, #00d52bbd 100%)',
    borderRadius: '1rem', maxWidth: '400px',
    boxShadow: '0px 0px 5px #000',
    border: '1px solid #fff'
  }

  return (
    <>
      <div className='loginBox abs top_10'>

      </div>

      <MDBContainer fluid >

        <MDBRow className='d-flex justify-content-center align-items-center '>
          <MDBCol col='12'>

            <MDBCard className=' text-white my-5 mx-auto' style={loginNg}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                <h4 className="fw-bold text-uppercase">Login</h4 >
                <p className="text-white-50 ">Enter your username and password !</p>
                {!loginStatus && loginClick &&
                  <Alert variant='danger'>
                    Login Failed
                  </Alert>
                }

                <MDBInput wrapperClass=' mx-5 w-100' onChange={(e) => setUsername(e.target.value)} labelClass='text-white' label='Email address' id='formControlLg' type='email' size="md" />
                <MDBInput wrapperClass='mb-1 mx-5 w-100' onChange={(e) => setPassword(e.target.value)} labelClass='text-white' label='Password' id='formControlLg' type='password' size="md" />

                <p className="small "><a class="text-white-50" href="#!">Forgot password?</a></p>
                <MDBBtn outline onClick={loginHandler} className='mx-2 px-5' style={{ color: 'white' }} color='white' size='lg'>
                  Login
                </MDBBtn>

              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>

    </>
  );
}




export default LoggedInPage