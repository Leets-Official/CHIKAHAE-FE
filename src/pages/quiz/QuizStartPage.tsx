import StartPageTemplate from '@/features/start/StartPageTemplate';
import image from '@/assets/images/quizStart.png';
import { useNavigate } from 'react-router-dom';

const QuizStartPage = () => {
  const navigate = useNavigate();

  return (
    <StartPageTemplate
      navTitle='퀴즈'
      imageSrc={image}
      imageAlt='퀴즈 시작 이미지'
      title='매일 퀴즈 도전하기'
      coinText='획득 치카코인'
      noticeList={['문항 수', '객관식, OX', '중도 이탈', '결과 확인']}
      onStart={() => navigate('/quiz')}
    />
  );
};

export default QuizStartPage;
