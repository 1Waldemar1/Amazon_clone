import { StoreProduct } from "./../../../type.d";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items, email } = req.body;
  const modifiedItems = items.map((items: StoreProduct) => ({
    quantity: items.quantity,
    price_data: {
      currency: "usd",
      unit_amount: items.price * 100,
      product_data: {
        name: items.title,
        description: items.description,
        images: [items.image],
      },
    },
  }));
  const session = await stripe.checkout.session.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["BD", "US", "OM", "CA", "GB"],
    },
    line_items: modifiedItems,
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    metadata: {
      email,
      image: JSON.stringify(items.map((item: any) => item.image)),
    },
  });
  res.status(200).json({
    id: session.id,
  });
}
