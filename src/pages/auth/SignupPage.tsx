import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupProfile from '@/features/signup/SignupProfile';
import SignupInfo from '@/features/signup/SignupInfo';
import SignupGuardianIntro from '@/features/signup/SignupGuardianIntro';
import SignupGuardianForm from '@/features/signup/SignupGuardianForm';
import SignupComplete from '@/features/signup/SignupComplete';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { signupUser } from '@/api/auth/signupAPI';

type Step = 'profile' | 'info' | 'guardianIntro' | 'guardianForm' | 'complete';

function SignupPage() {
  const [step, setStep] = useState<Step>('profile');
  const navigate = useNavigate();

  //유저 정보 상태
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'any' | ''>('');
  const [profileImage, setProfileImage] = useState<string | undefined>();

  // 보호자 정보 상태
  const [parentName, setParentName] = useState('');
  const [parentGender, setParentGender] = useState<'male' | 'female' | 'any' | ''>('');
  const [parentBirth, setParentBirth] = useState('');

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
        //브라우저 히스토리에 이전 페이지 있는지 체크
        navigate(-1); // 있으면 이전 페이지로 이동
      } else {
        navigate('/'); // 없으면(signupprofilePage) : 홈으로 네비게이트
      }
    }
  };

  const convertGenderToBoolean = (g: 'male' | 'female' | 'any' | '') => {
    if (g === 'male') return true;
    if (g === 'female') return false;
    return undefined;
  };

  const handleFinalSignup = async () => {
    const kakaoAccessToken = localStorage.getItem('kakaoAccessToken');
    if (!kakaoAccessToken) {
      console.error('카카오 access token 없음');
      navigate('/login');
      return;
    }
    try {
      await signupUser({
        kakaoAccessToken,
        nickname,
        birth,
        gender: convertGenderToBoolean(gender),
        profileImage,
        parentName: parentName || undefined,
        parentGender: convertGenderToBoolean(parentGender),
        parentBirth: parentBirth || undefined,
      });

      goToNext('complete');
    } catch (e) {
      console.error('회원가입 실패:', e);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <>
      <GlobalTopNav type='signup' message='' onClickLeft={handleBack} />
      <div>
        {step === 'profile' && (
          <SignupProfile
            nickname={nickname}
            setNickname={setNickname}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            onNext={() => goToNext('info')}
          />
        )}

        {step === 'info' && (
          <SignupInfo
            birthDate={birth}
            setBirthDate={setBirth}
            gender={gender}
            setGender={setGender}
            onNext={(nextStep) => goToNext(nextStep)}
          />
        )}

        {step === 'guardianIntro' && (
          <SignupGuardianIntro onNext={() => goToNext('guardianForm')} />
        )}

        {step === 'guardianForm' && (
          <SignupGuardianForm
            name={parentName}
            setName={setParentName}
            gender={parentGender}
            setGender={setParentGender}
            birthDate={parentBirth}
            setBirthDate={setParentBirth}
            onNext={handleFinalSignup}
          />
        )}

        {step === 'complete' && <SignupComplete />}
      </div>
    </>
  );
}

export default SignupPage;
