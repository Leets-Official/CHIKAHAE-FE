import { useQuery } from '@tanstack/react-query';
import { getPointBalance } from '@/api/home/pointAPI';

export const usePointBalance = () => {
  return useQuery({
    queryKey: ['pointBalance'],
    queryFn: getPointBalance,
    staleTime: 1000 * 60, // 1분 정도 캐시 유효
  });
};
