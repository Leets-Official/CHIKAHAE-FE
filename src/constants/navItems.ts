import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg';
import { ReactComponent as ChikaIcon } from '@/assets/icons/chika.svg';
import { ReactComponent as QuizIcon } from '@/assets/icons/quiz.svg';
import { ReactComponent as MyPageIcon } from '@/assets/icons/mypage.svg';

export const NAV_ITEMS = [
  { label: '치카해', to: '/', icon: HomeIcon },
  { label: '치카해', to: '/brush/start', icon: ChikaIcon },
  { label: '치카해', to: '/quiz/start', icon: QuizIcon },
  { label: '치카해', to: '/mypage', icon: MyPageIcon },
];
