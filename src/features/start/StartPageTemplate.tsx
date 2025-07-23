import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { ReactComponent as Coin } from '@/assets/icons/coin.svg';
import QuizNoticeList from '@/components/ui/NoticeList';
import BottomNav from '@/components/ui/Nav/BottomNav';
import Button from '@/components/ui/Button';

type StartPageTemplateProps = {
  navTitle: string;
  imageSrc: string; // FIXME: 추후 svg로 수정될 예정
  imageAlt: string; // FIXME: svg 삽입되면 삭제 예정
  title: string; // 페이지 주요 제목
  coinText: string; // 보상 관련 텍스트
  noticeList: string[]; // 유의사항 리스트
  onStart: () => void; // 시작 버튼 클릭 시 호출되는 콜백
  startButtonText?: string; // 시작 버튼 텍스트 (기본값: 시작하기)
};

const StartPageTemplate = ({
  navTitle,
  imageSrc,
  imageAlt,
  title,
  coinText,
  noticeList,
  onStart,
  startButtonText = '시작하기',
}: StartPageTemplateProps) => {
  return (
    <>
      {/* 페이지 상단 영역 */}
      <div className='relative min-h-screen flex justify-center'>
        <div className='flex flex-col w-full max-w-[430px] min-w-[360px] px-[18px] gap-[10px]'>
          <GlobalTopNav message={navTitle} showCancel={false} showLeftIcon={false} />

          {/* 상단 대표 이미지 (향후 SVG로 교체 예정) */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className='flex items-center justify-start mt-14 h-[220px] rounded-[8px] bg-fg-weak mb-[10px]'
          />

          {/* 메인 제목 */}
          <h1 className='head-24-eb text-left'>{title}</h1>

          {/* 코인 아이콘 + 지급 텍스트 */}
          <div className='flex items-center gap-[6px] mb-[10px]'>
            <Coin className='h-[20px] w-[20px] translate-y-[-1.5px]' />
            <p className='body-16-r text-left leading-[20px]'>{coinText}</p>
          </div>

          {/* 유의사항 리스트 */}
          <QuizNoticeList noticeList={noticeList} />
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div className='fixed bottom-0 left-0 right-0 flex justify-center'>
        <div className='w-full max-w-[480px] min-w-[360px] px-[20px] pb-[115px]'>
          <Button size='large' variant='primary' fullWidth onClick={onStart}>
            {startButtonText}
          </Button>
        </div>
      </div>

      {/*  하단 네비게이션 */}
      <BottomNav />
    </>
  );
};

export default StartPageTemplate;
