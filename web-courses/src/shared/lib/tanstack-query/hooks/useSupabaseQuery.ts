import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { PostgrestError } from '@supabase/supabase-js';

interface SupabaseQueryOptions<TData> extends Omit<UseQueryOptions<TData, PostgrestError>, 'queryFn'> {
  queryFn: () => Promise<{ data: TData | null; error: PostgrestError | null }>;
}

export function useSupabaseQuery<TData = unknown>({
  queryFn,
  ...options
}: SupabaseQueryOptions<TData>) {
  return useQuery<TData, PostgrestError>({
    ...options,
    queryFn: async () => {
      const { data, error } = await queryFn();
      
      if (error) {
        throw error;
      }
      
      if (data === null) {
        throw new Error('No data returned');
      }
      
      return data;
    },
  });
}
