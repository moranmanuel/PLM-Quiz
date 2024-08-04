import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nwdczseanmbrybgtsxfb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZGN6c2Vhbm1icnliZ3RzeGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzNjQ4MjcsImV4cCI6MjAzNzk0MDgyN30.EEq04Mo2grwTyp7igibmb5AMbdnTAhHk44B9DlE12Hc";

export const supabase = createClient(supabaseUrl, supabaseKey);