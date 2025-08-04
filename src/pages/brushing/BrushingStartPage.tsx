import StartPageTemplate from '@/features/start/StartPageTemplate';
import image from '@/assets/images/brushingStart.svg';
import { useNavigate } from 'react-router-dom';

const BrushingStartPage = () => {
  const navigate = useNavigate();

  return (
    <StartPageTemplate
      navTitle='양치하기'
      imageSrc={image}
      imageAlt='양치 시작 이미지'
      title='매일 양치하기'
      coinText='3 치카코인 획득'
      noticeList={[
        '하루 3번! 아침, 점심, 저녁 양치 미션에 도전해봐요.',
        '3분 동안 양치 애니메이션을 시청해요!',
        '주의! 도중에 나가면 처음부터 다시 시작해야 해요.',
        '미션을 완료하면 포인트도 받을 수 있어요!',
      ]}
      onStart={() => navigate('/brush')}
    />
  );
};

export default BrushingStartPage;
