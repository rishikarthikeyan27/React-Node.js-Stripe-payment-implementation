import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        // res will contain the Stripe response.
        const res = await axios.post(
          'http://localhost:5000/api/checkout/payment',
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        navigate('/success');
      } catch (error) {
        console.log(error);
      }
    };
    // If stripeToken exists, makeRequest.
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {stripeToken ? (
        <span>Processing ...</span>
      ) : (
        <StripeCheckout
          name='Rocket Shop'
          image={process.env.REACT_APP_STRIPE_IMAGE}
          billingAddress
          shippingAddress
          description='Your total is $20'
          token={onToken}
          amount={2000}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button
            style={{
              border: 'none',
              width: 120,
              borderRadius: 5,
              padding: '20px',
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
