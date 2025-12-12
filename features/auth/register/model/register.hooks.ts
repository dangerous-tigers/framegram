import { useMutation } from '@tanstack/react-query';
import { RegisterFormValues } from '@/features/auth/register/model/register.schema';
import { register } from '@/features/auth/register/api/register.api';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterFormValues) => register(data),
  });
};
