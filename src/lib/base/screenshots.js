import { supabase } from './client';

export const getScreenshots = async (id) => {
  const { data } = await supabase.from('screenshots').select('*');
  return data;
};
