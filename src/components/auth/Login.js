import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  ///state = {
  //       formData: {
  //           name: '',
  //           email: ''
  //       }
  //   }

  const [formData, setFormData] = useState({
    email: '',
    userPassword: ''
  });

  const { email, userPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    const user = {
      email,
      userPassword
    };
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(response => console.log(response.token));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='userPassword'
            minLength='6'
            value={userPassword}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don`t have an account? <Link to='/register'>Register</Link>
      </p>
    </Fragment>
  );
};

export default Login;
