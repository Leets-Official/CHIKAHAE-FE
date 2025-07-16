import QuizFooter from '@/components/Quiz/QuizPage/QuizFooter';
import QuizNoticeList from '@/components/ui/NoticeList';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { ReactComponent as Coin } from '@/assets/icons/coin.svg';

// 퀴즈 시작 화면

const StartQuizPage = () => {
  //FIXME: CSS 확정되는 대로 수정 예정

  const quizNoticeList = ['문항 수', '객관식, ox', '중도 이탈', '결과 확인'];

  return (
    <>
      <div className='w-full relative min-h-screen flex justify-center'>
        <div className='flex flex-col w-[360px] px-[20px] gap-[10px]'>
          <GlobalTopNav isCenter message='퀴즈' />
          {/* 이미지 영역 */}
          <div className='flex items-center justify-start mt-14 h-[220px] px-[100px] rounded-[8px] bg-fg-weak mb-[10px]'>
            <span className='head-24-eb text-center'>이미지 영역</span>
          </div>
          {/* 타이틀 */}
          <h1 className='head-24-eb text-left'>매일 퀴즈 도전하기</h1>

          {/* 설명 문구 */}
          <div className='flex items-center gap-[6px] mb-[10px]'>
            <Coin className='h-[20px] w-[20px]' />
            <p className='body-16-r text-left'>획득 치카코인</p>
          </div>

          {/* 안내 박스 */}
          <QuizNoticeList noticeList={quizNoticeList} />
        </div>
      </div>

      {/* 퀴즈 시작 버튼 (Footer) */}
      <QuizFooter step='start' selectedAnswer={null} onNext={() => {}} />
    </>
  );
};

export default StartQuizPage;
