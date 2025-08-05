import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SignupProfile from '@/features/signup/SignupProfile';
import SignupInfo from '@/features/signup/SignupInfo';
import SignupGuardianIntro from '@/features/signup/SignupGuardianIntro';
import SignupGuardianForm from '@/features/signup/SignupGuardianForm';
import SignupComplete from '@/features/signup/SignupComplete';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { signupUser } from '@/api/auth/signupAPI';
import { useToast } from '@/contexts/ToastContext';

type Step = 'profile' | 'info' | 'guardianIntro' | 'guardianForm' | 'complete';

interface UserInfo {
  nickname: string;
  birth: string;
  gender: string;
}

interface ParentInfo {
  name: string;
  gender: string;
  birth: string;
  phoneNumber: string;
}

function SignupPage() {
  const [step, setStep] = useState<Step>('profile');
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const kakaoAccessToken =
    location.state?.kakaoAccessToken || localStorage.getItem('kakaoAccessToken');

  const [user, setUser] = useState<UserInfo>({
    nickname: '',
    birth: '',
    gender: '',
  });

  const [parent, setParent] = useState<ParentInfo>({
    name: '',
    gender: '',
    birth: '',
    phoneNumber: '',
  });

  // 부모 정보 업데이트 함수
  const updateParent = (key: keyof ParentInfo, value: string) => {
    setParent((prev) => ({ ...prev, [key]: value }));
  };

  const goToNext = (nextStep: Step) => setStep(nextStep);

  const getPrevStep = (currentStep: Step): Step | null => {
    const steps: Step[] = ['profile', 'info', 'guardianIntro', 'guardianForm', 'complete'];
    const idx = steps.indexOf(currentStep);
    return idx > 0 ? steps[idx - 1] : null;
  };

  const handleBack = () => {
    const prevStep = getPrevStep(step);
    if (prevStep) {
      setStep(prevStep);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  const handleFinalSignup = async (isOver14Only = false) => {
    if (!kakaoAccessToken) {
      console.error('카카오 access token 없음');
      navigate('/login');
      return;
    }

    try {
      let payload;

      if (isOver14Only) {
        payload = {
          kakaoAccessToken: kakaoAccessToken,
          nickname: user.nickname,
          birth: user.birth,
          gender: user.gender,
        };
      } else {
        payload = {
          kakaoAccessToken: kakaoAccessToken,
          nickname: user.nickname,
          birth: user.birth,
          gender: user.gender,
          parentName: parent.name,
          parentGender: parent.gender,
          parentBirth: parent.birth,
          parentPhoneNumber: parent.phoneNumber,
        };
      }

      // 디버깅용
      console.log('회원가입 요청 payload:', payload);

      await signupUser(payload);

      localStorage.removeItem('kakaoAccessToken');
      localStorage.removeItem('kakaoRefreshToken');
      goToNext('complete');
    } catch (e) {
      console.error('회원가입 실패:', e);
      showToast({ message: '회원가입 중 오류가 발생했습니다.', showIcon: false });
    }
  };

  return (
    <>
      <GlobalTopNav type='signup' message='' onClickLeft={handleBack} />
      <div>
        {step === 'profile' && (
          <SignupProfile
            nickname={user.nickname}
            setNickname={(nickname: string) => setUser((prev) => ({ ...prev, nickname }))}
            onNext={() => goToNext('info')}
          />
        )}

        {step === 'info' && (
          <SignupInfo
            birthDate={user.birth}
            setBirthDate={(birth) => setUser((prev) => ({ ...prev, birth }))}
            gender={user.gender}
            setGender={(gender) => setUser((prev) => ({ ...prev, gender }))}
            onNext={(nextStep) => {
              if (nextStep === 'complete') {
                handleFinalSignup(true); // 14세 이상
              } else {
                goToNext(nextStep); // 14세 미만
              }
            }}
          />
        )}

        {step === 'guardianIntro' && (
          <SignupGuardianIntro onNext={() => goToNext('guardianForm')} />
        )}

        {step === 'guardianForm' && (
          <SignupGuardianForm
            name={parent.name}
            setName={(value) => updateParent('name', value)}
            gender={parent.gender}
            setGender={(value) => updateParent('gender', value)}
            birthDate={parent.birth}
            setBirthDate={(value) => updateParent('birth', value)}
            phoneNumber={parent.phoneNumber}
            setPhoneNumber={(value) => updateParent('phoneNumber', value)}
            onNext={() => handleFinalSignup(false)}
          />
        )}

        {step === 'complete' && <SignupComplete />}
      </div>
      <div className='fixed top-0 right-3 flex flex-col gap-2 z-50'></div>
    </>
  );
}

export default SignupPage;
