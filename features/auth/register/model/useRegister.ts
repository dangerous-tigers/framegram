import { registerApi } from '@/features/auth/register/api/register.api';
import { RegisterRequestDto } from '@/features/auth/register/model/register.types';
import { useMutation } from '@tanstack/react-query';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterRequestDto) => registerApi(data),
  });
};
