// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fscobewghbrgvaqaftfj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzY29iZXdnaGJyZ3ZhcWFmdGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NTA4MTgsImV4cCI6MjA2NDIyNjgxOH0.9FKHSWQlkmaRmzagWWsky1K46YflXxUS6wc0dBnpb2Q'

export const supabase = createClient(supabaseUrl, supabaseKey)
