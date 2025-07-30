import requiredTerms from '@/assets/terms/required-terms.md?raw';
import requiredPrivacy from '@/assets/terms/required-privacy.md?raw';
import optionalPrivacy from '@/assets/terms/optional-privacy.md?raw';

export const TERMS: Record<
  'required-terms' | 'required-privacy' | 'optional-privacy',
  { content: string; message: string }
> = {
  'required-terms': {
    content: requiredTerms,
    message: '[팔수] 치카해 서비스 이용약관',
  },
  'required-privacy': {
    content: requiredPrivacy,
    message: '[필수] 개인정보 수집 및 이용에 대한 동의',
  },
  'optional-privacy': {
    content: optionalPrivacy,
    message: '[선택] 개인정보 수집 및 이용에 대한 동의',
  },
};

export type TermType = 'required-terms' | 'required-privacy' | 'optional-privacy';
