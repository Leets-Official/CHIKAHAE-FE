import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { ReactComponent as Coin } from '@/assets/icons/coin.svg';
import QuizNoticeList from '@/components/ui/NoticeList';
import BottomNav from '@/components/ui/Nav/BottomNav';
import Button from '@/components/ui/Button';

type StartPageTemplateProps = {
  navTitle: string;
  imageSrc: string;
  imageAlt: string;
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
      <div className='flex flex-col min-h-screen w-full max-w-[480px] min-w-[360px] mx-auto'>
        <div className='flex flex-col w-full gap-[10px] pb-[30px]'>
          <GlobalTopNav message={navTitle} showCancel={false} showLeftIcon={false} />

          <div className='h-14' />
          {/* 상단 대표 이미지 */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className='flex items-center justify-start **:w-full bg-fg-weak mb-[10px]'
          />
          {/* 메인 제목 + 코인 텍스트 + 유의사항 리스트 */}
          <div className='px-[20px]'>
            {/* 메인 제목 */}
            <h1 className='head-24-eb text-left mb-[8px]'>{title}</h1>

            {/* 코인 아이콘 + 지급 텍스트 */}
            <div className='flex items-center gap-[8px] mb-[23px]'>
              <Coin className='h-[20px] w-[20px] translate-y-[-1.5px]' />
              <p className='body-16-r text-left leading-[20px]'>{coinText}</p>
            </div>

            {/* 유의사항 리스트 */}
            <QuizNoticeList noticeList={noticeList} />
          </div>
        </div>

        {/* 시작하기 버튼 */}
        <div className='flex justify-center mt-auto'>
          <div className='w-full max-w-[480px] min-w-[360px] px-[20px] pb-[100px]'>
            <Button size='large' variant='primary' fullWidth onClick={onStart}>
              {startButtonText}
            </Button>
          </div>
        </div>
      </div>

      {/*  하단 네비게이션 */}
      <BottomNav />
    </>
  );
};

export default StartPageTemplate;
