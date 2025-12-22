'use client';

import { useMutation } from '@tanstack/react-query';
import { confirmEmail } from '../api/confirmEmail.api';

export const useConfirmEmail = () =>
  useMutation({
    mutationFn: confirmEmail,
  });
