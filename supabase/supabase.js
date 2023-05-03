const {createClient} = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('supabaseUrl and supabaseKey are required');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {supabase}