import { useState, useCallback } from 'react';

interface UseOptimisticMutationOptions<T> {
  mutationFn: (variables: unknown) => Promise<T>;
  onOptimisticUpdate: () => void;
  onRollback: () => void;
}

export function useOptimisticMutation<T>({ mutationFn, onOptimisticUpdate, onRollback }: UseOptimisticMutationOptions<T>) {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = useCallback(async (variables: unknown) => {
    setIsLoading(true);
    onOptimisticUpdate();
    try {
      const result = await mutationFn(variables);
      setIsLoading(false);
      return result;
    } catch (error) {
      onRollback();
      setIsLoading(false);
      throw error;
    }
  }, [mutationFn, onOptimisticUpdate, onRollback]);

  return { mutate, isLoading };
}
