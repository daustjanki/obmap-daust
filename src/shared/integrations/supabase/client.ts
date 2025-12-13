/**
 * Shared Supabase Client
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://lbvsmjfxpxnvoxwoxqkr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidnNtamZ4cHhudm94d294cWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NDExNDEsImV4cCI6MjA2MjUxNzE0MX0.sFLT8M8eBtCi2F3FjHbntFZnYl1k3Y-p6Y1bqnKjQeo";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
