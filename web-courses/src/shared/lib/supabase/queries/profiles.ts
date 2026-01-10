import { supabase } from '../client';

const validateName = (name: string): { valid: boolean; error?: string } => {
  const trimmed = name.trim()
  
  if (trimmed.length < 3) {
    return { valid: false, error: 'El nombre debe tener al menos 3 caracteres' }
  }
  if (trimmed.length > 50) {
    return { valid: false, error: 'El nombre no puede tener más de 50 caracteres' }
  }
 if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(trimmed)) {
  return { valid: false, error: 'El nombre solo puede contener letras' }
}
  
  return { valid: true }
}

export const profileQueries = {
  getById: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { data, error };
  },

  // Crear perfil (por si acaso, aunque el trigger lo hace automático)
  create: async (profile: {
    id: string;
    email: string;
    name?: string;
  }) => {
    // Validar nombre si existe
    if (profile.name) {
      const validation = validateName(profile.name)
      if (!validation.valid) {
        return { 
          data: null, 
          error: { message: validation.error } as any
        }
      }
      profile.name = profile.name.trim() 
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    
    return { data, error };
  },

  // Actualizar perfil
  update: async (userId: string, updates: {
    name?: string;
    avatar_url?: string;
    role?: string;
    bio?: string;
  }) => {
    // Validar nombre si se está actualizando
    if (updates.name !== undefined) {
      const validation = validateName(updates.name)
      if (!validation.valid) {
        return { 
          data: null, 
          error: { message: validation.error } as any
        }
      }
      updates.name = updates.name.trim() 
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    return { data, error };
  },

  // Buscar perfiles
  search: async (query: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`);
    
    return { data, error };
  },

  // Eliminar perfil
  delete: async (userId: string) => {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    
    return { error };
  },
};

export { validateName };