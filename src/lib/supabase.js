import { createClient } from "@supabase/supabase-js";

// ✅ Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Check if variables exist
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or ANON key is missing in .env file");
}

// ✅ Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* -----------------------------
   Data Model Reference (JS Docs)
------------------------------ */

/**
 * MenuItem example:
 * {
 *   id: string,
 *   name: string,
 *   category: string,
 *   price: number,
 *   description: string,
 *   image_url: string,
 *   created_at: string
 * }
 */

/**
 * Order example:
 * {
 *   id: string,
 *   user_email: string,
 *   user_name: string,
 *   user_phone: string,
 *   delivery_address: string,
 *   total_amount: number,
 *   status: string,
 *   payment_status: string,
 *   payment_intent_id: string | null,
 *   created_at: string,
 *   updated_at: string
 * }
 */

/**
 * OrderItem example:
 * {
 *   id: string,
 *   order_id: string,
 *   menu_item_id: string,
 *   quantity: number,
 *   price: number,
 *   created_at: string
 * }
 */
