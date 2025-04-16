// src/services/crewmateService.js
import supabase from './supabaseClient';

export const createCrewmate = async (crewmateData) => {
  const { data, error } = await supabase
    .from('crewmates')
    .insert([crewmateData])
    .select();
    
  if (error) throw error;
  return data[0];
};

export const getCrewmates = async () => {
  const { data, error } = await supabase
    .from('crewmates')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const getCrewmateById = async (id) => {
  const { data, error } = await supabase
    .from('crewmates')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};

export const updateCrewmate = async (id, updates) => {
  const { data, error } = await supabase
    .from('crewmates')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data[0];
};

export const deleteCrewmate = async (id) => {
  const { error } = await supabase
    .from('crewmates')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
};