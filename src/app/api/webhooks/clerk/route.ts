import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { createUser, updateUser, deleteUser } from "@/lib/users";
import { User } from "@prisma/client";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const webhook = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let event: WebhookEvent;

  // Verify payload with headers
  try {
    event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = event.type;
  const {
    id,
    email_addresses,
    first_name,
    last_name,
    image_url,
    public_metadata,
  } = event.data as UserJSON;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);
  console.log("Public metadata:", public_metadata);

  if (eventType === "user.created") {
    if (!id || !email_addresses) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const user = {
      clerkUserId: id,
      email: email_addresses[0].email_address,
      ...(first_name ? { firstName: first_name } : {}),
      ...(last_name ? { lastName: last_name } : {}),
      ...(image_url ? { imageUrl: image_url } : {}),
    };

    console.log("USER", user);

    const result = await createUser(user as User);
    console.log("RESULT", result);
  } else if (eventType === "user.updated") {
    if (!id || !email_addresses) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const user = {
      clerkUserId: id,
      email: email_addresses[0].email_address,
      ...(first_name ? { firstName: first_name } : {}),
      ...(last_name ? { lastName: last_name } : {}),
      ...(image_url ? { imageUrl: image_url } : {}),
    };

    await updateUser(id, user as User);
  } else if (eventType === "user.deleted") {
    console.log("Id", id);

    if (!id) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const result = await deleteUser(id);
    console.log("RESULT", result);
  }

  return new Response("Webhook received", { status: 200 });
}
