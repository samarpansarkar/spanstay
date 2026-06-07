import dotenv from 'dotenv';
import Stripe from 'stripe';
dotenv.config();
console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
