import React from 'react';

const Landing = () => {
  return (
    <section class='landing'>
      <div class='dark-overlay'>
        <div class='landing-inner'>
          <h1 class='x-large'>My Vacation Bucketlist</h1>
          <p class='lead'>
            Save your desire bucketlist vacations to see and be updated the best
            prices and dates avilable{' '}
          </p>
          <div class='buttons'>
            <a href='register.html' class='btn btn-primary'>
              Sign Up
            </a>
            <a href='login.html' class='btn btn'>
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
