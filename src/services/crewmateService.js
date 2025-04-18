// src/services/crewmateService.js
import supabase from './supabaseClient';

// Create a new crewmate
export const createCrewmate = async (crewmateData) => {
  try {
    const { data, error } = await supabase
      .from('crewmates')
      .insert([
        {
          name: crewmateData.name,
          category: crewmateData.category,
          speed: crewmateData.speed,
          color: crewmateData.color,
          special_ability: crewmateData.special_ability,
        }
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  } catch (error) {
    console.error('Error creating crewmate:', error);
    throw error;
  }
};

// Get all crewmates
export const getCrewmates = async () => {
  try {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching crewmates:', error);
    throw error;
  }
};

// Get a specific crewmate by ID
export const getCrewmateById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching crewmate with ID ${id}:`, error);
    throw error;
  }
};

// Update a crewmate
export const updateCrewmate = async (id, crewmateData) => {
  try {
    const { data, error } = await supabase
      .from('crewmates')
      .update({
        name: crewmateData.name,
        category: crewmateData.category,
        speed: crewmateData.speed,
        color: crewmateData.color,
        special_ability: crewmateData.special_ability,
      })
      .eq('id', id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  } catch (error) {
    console.error(`Error updating crewmate with ID ${id}:`, error);
    throw error;
  }
};

// Delete a crewmate
export const deleteCrewmate = async (id) => {
  try {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting crewmate with ID ${id}:`, error);
    throw error;
  }
};