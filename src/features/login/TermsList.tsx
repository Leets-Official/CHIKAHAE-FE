import { ReactComponent as Check } from '@/assets/icons/check.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/chevron_right.svg';
import { TERMS } from '@/constants/terms';

interface TermsListProps {
  agreements: boolean[]; // 각 약관의 체크 여부
  onToggle: (idx: number) => void; // 약관 체크 토글
  onNavigate: (url: string) => void; // 약관 상세 페이지로 이동
  searchParams: URLSearchParams; // 현재 URL의 쿼리 파라미터
}

// 약관 체크박스 리스트 컴포넌트
const TermsList = ({ agreements, onToggle, onNavigate, searchParams }: TermsListProps) => {
  return (
    <ul className='space-y-2 mb-6'>
      {/* TERMS 객체 순회하며 약관 항목 렌더링 */}
      {Object.entries(TERMS).map(([key, { message }], idx) => {
        return (
          <div key={key} className='cursor-pointer'>
            <div className='flex flex-row justify-between'>
              {/* 왼쪽: 체크 아이콘 + 약관 메시지 */}
              <div className='flex flex-row gap-2.5' onClick={() => onToggle(idx)}>
                <Check
                  className={`w-6 h-6 ${agreements[idx] ? 'text-fg-accent-blue-weak' : 'text-fg-medium'}`}
                />
                <li
                  className={`text-[12px] font-bold ${agreements[idx] ? 'text-fg-primary' : 'text-fg-medium'}`}
                >
                  {message}
                </li>
              </div>

              {/* 오른쪽: > 아이콘 누르면 약관 상세 페이지로 이동 */}
              <ChevronRight
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(
                    `/terms/${['required-terms', 'required-privacy', 'optional-privacy'][idx]}?${searchParams.toString()}`,
                  );
                }}
                className={`w-6 h-6 ${agreements[idx] ? 'text-fg-primary' : 'text-fg-medium'}`}
              />
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default TermsList;
