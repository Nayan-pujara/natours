/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51GxpgPAbwu6aK4YU9XxUU7fDK6AZimKDuFOa2o5AjXHZtvHSj5qXrnvQnBRTtA7mD80LWPApm2AMvWCC7rDce1Cz00gFYUYPd7'
);

export const bookTour = async tourId => {
  try {
    // 1) Get Checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
