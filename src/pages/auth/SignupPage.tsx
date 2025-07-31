import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupProfile from '@/features/signup/SignupProfile';
import SignupInfo from '@/features/signup/SignupInfo';
import SignupGuardianIntro from '@/features/signup/SignupGuardianIntro';
import SignupGuardianForm from '@/features/signup/SignupGuardianForm';
import SignupComplete from '@/features/signup/SignupComplete';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { signupUser } from '@/api/auth/signupAPI';
import Toast from '@/components/ui/Toast/Toast';

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
  const navigate = useNavigate();

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

  const [toasts, setToasts] = useState<{ id: string; message: string; duration?: number }[]>([]);

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

  // 토스트 추가 함수
  const showToast = (id: string, message: string, duration = 3000) => {
    setToasts((prev) => [...prev, { id, message, duration }]);
  };

  // 토스트 제거 함수
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleFinalSignup = async (isOver14Only = false) => {
    const accessToken = localStorage.getItem('kakaoAccessToken');
    if (!accessToken) {
      console.error('카카오 access token 없음');
      navigate('/login');
      return;
    }

    try {
      if (isOver14Only) {
        await signupUser({
          kakaoAccessToken: accessToken,
          nickname: user.nickname,
          birth: user.birth,
          gender: user.gender,
        });
      } else {
        await signupUser({
          kakaoAccessToken: accessToken,
          nickname: user.nickname,
          birth: user.birth,
          gender: user.gender,
          parentName: parent.name,
          parentGender: parent.gender,
          parentBirth: parent.birth,
          parentPhoneNumber: parent.phoneNumber,
        });
      }

      goToNext('complete');
    } catch (e) {
      console.error('회원가입 실패:', e);
      showToast('signup-error', '회원가입 중 오류가 발생했습니다. 다시 시도해주세요');
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
            setName={(name: string) => setParent((prev) => ({ ...prev, name }))}
            gender={parent.gender}
            setGender={(gender: string) => setParent((prev) => ({ ...prev, gender }))}
            birthDate={parent.birth}
            setBirthDate={(birth: string) => setParent((prev) => ({ ...prev, birth }))}
            phoneNumber={parent.phoneNumber}
            setPhoneNumber={(phoneNumber: string) =>
              setParent((prev) => ({ ...prev, phoneNumber }))
            }
            onNext={handleFinalSignup}
          />
        )}

        {step === 'complete' && <SignupComplete />}
      </div>
      <div className='fixed top-0 right-3 flex flex-col gap-2 z-50'>
        {toasts.map(({ id, message, duration }) => (
          <Toast key={id} id={id} message={message} duration={duration} onClose={removeToast} />
        ))}
      </div>
    </>
  );
}

export default SignupPage;
