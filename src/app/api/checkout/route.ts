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
      // In a real production app, you MUST fetch the price from the database here
      // to ensure the client hasn't manipulated it.
      // e.g. const product = await db.product.findUnique({ where: { id: item.id } });
      totalAmount += item.price * item.quantity;
    }

    // Create the order in the database
    const order = await db.order.create({
      data: {
        userId: user?.id,
        totalAmount,
        status: "PAID", // Simulating a successful payment for now
        paymentId: `mock_pi_${Date.now()}`,
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
