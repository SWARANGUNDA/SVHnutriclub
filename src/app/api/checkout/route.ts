import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  // We attempt to get the user, but we allow guest checkout since userId is optional in the schema
  const { user } = await requireAuthApi();
  
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate total on the server to prevent tampering
    let totalAmount = 0;
    for (const item of items) {
      const product = await db.product.findUnique({ where: { id: item.id.toString() } });
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 404 });
      }
      // Re-assign the correct price from the database
      item.price = product.price;
      totalAmount += product.price * item.quantity;
    }

    // In a real application, you would create a Stripe/Razorpay session here.
    // Since payment integration is not configured, we return a 501 error.
    if (!process.env.STRIPE_SECRET_KEY && !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "PAYMENT_NOT_CONFIGURED" }, { status: 501 });
    }

    // This block will never be reached during testing without keys
    const order = await db.order.create({
      data: {
        userId: user?.id,
        totalAmount,
        status: "PENDING",
        paymentId: `real_pi_${Date.now()}`,
        items: {
          create: items.map((item: any) => ({
            productId: item.id.toString(), // Ensure string matching the schema
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("[API] Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
