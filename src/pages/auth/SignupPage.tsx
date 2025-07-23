import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupProfile from '@/features/signup/Signupprofile';
import SignupInfo from '@/features/signup/SignupInfo';
import SignupGuardianIntro from '@/features/signup/SignupGuardianIntro';
import SignupGuardianForm from '@/features/signup/SignupGuardianForm';
import SignupComplete from '@/features/signup/SignupComplete';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';

type Step = 'profile' | 'info' | 'guardianIntro' | 'guardianForm' | 'complete';

function SignupPage() {
  const [step, setStep] = useState<Step>('profile');
  const navigate = useNavigate();
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

  return (
    <>
      <GlobalTopNav type='signup' message='' onClickLeft={handleBack} />
      <div>
        {step === 'profile' && <SignupProfile onNext={() => goToNext('info')} />}
        {step === 'info' && <SignupInfo onNext={() => goToNext('guardianIntro')} />}
        {step === 'guardianIntro' && (
          <SignupGuardianIntro onNext={() => goToNext('guardianForm')} />
        )}
        {step === 'guardianForm' && <SignupGuardianForm onNext={() => goToNext('complete')} />}
        {step === 'complete' && <SignupComplete />}
      </div>
    </>
  );
}

export default SignupPage;
