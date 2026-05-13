import { useState, useCallback } from 'react';

interface ConfirmState {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const confirm = useCallback((title: string, description: string, onConfirm: () => void) => {
    setState({ open: true, title, description, onConfirm });
  }, []);

  const handleConfirm = useCallback(() => {
    state.onConfirm();
    setState((prev) => ({ ...prev, open: false }));
  }, [state]);

  const cancel = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  return { ...state, confirm, handleConfirm, cancel };
}
