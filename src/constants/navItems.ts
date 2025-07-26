import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg';
import { ReactComponent as ChikaIcon } from '@/assets/icons/chika.svg';
import { ReactComponent as QuizIcon } from '@/assets/icons/quiz.svg';
import { ReactComponent as MyPageIcon } from '@/assets/icons/mypage.svg';

export const NAV_ITEMS = [
  { label: '홈', to: '/', icon: HomeIcon },
  { label: '양치', to: '/brush/start', icon: ChikaIcon },
  { label: '퀴즈', to: '/quiz/start', icon: QuizIcon },
  { label: '마이페이지', to: '/mypage', icon: MyPageIcon },
];
