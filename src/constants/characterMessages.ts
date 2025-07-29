import { ReactComponent as AuthCharacterRandom1 } from '@/assets/icons/authCharacterRandom1.svg';
import { ReactComponent as AuthCharacterRandom2 } from '@/assets/icons/authCharacterRandom2.svg';
import { ReactComponent as AuthCharacterRandom3 } from '@/assets/icons/authCharacterRandom3.svg';

export const CHARACTER_MESSAGES = [
  {
    main: '치카해와 양치 습관 만들기 ',
    sub: '매일매일 즐겁게 양치하기!',
    Svg: AuthCharacterRandom1,
  },

  {
    main: '치카해와 올바른 양치 습관 형성',
    sub: '오늘도 깨끗하게 치카해!',
    Svg: AuthCharacterRandom2,
  },
  {
    main: '치카해랑 치아 건강 지키기!',
    sub: '하루 3번, 치카하기 약속!',
    Svg: AuthCharacterRandom3,
  },
] as const;
