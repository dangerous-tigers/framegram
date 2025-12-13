import { useMutation } from '@tanstack/react-query';
import { register } from '@/features/auth/register/api/register.api';
import { RegisterRequestDto } from '@/features/auth/register/model/register.types';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterRequestDto) => register(data),
  });
};
