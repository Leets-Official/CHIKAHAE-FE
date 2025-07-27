import StartPageTemplate from '@/features/start/StartPageTemplate';
import image from '@/assets/images/brushingStart.png';
import { useNavigate } from 'react-router-dom';

const BrushingStartPage = () => {
  const navigate = useNavigate();

  return (
    <StartPageTemplate
      navTitle='양치하기'
      imageSrc={image}
      imageAlt='양치 시작 이미지'
      title='매일 양치하기'
      coinText='획득 치카코인'
      noticeList={['안내사항1', '안내사항2', '안내사항3', '안내사항4']}
      onStart={() => navigate('/brush')}
    />
  );
};

export default BrushingStartPage;
