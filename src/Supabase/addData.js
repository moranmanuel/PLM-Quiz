import { supabase } from './supabaseClient';

export async function addData(data) {
    const { error } = await supabase.from('players').insert(data);
    return error;
}