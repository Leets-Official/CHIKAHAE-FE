import { useState } from 'react';
import SignupProfile from '../signup/SignupprofilePage';
import SignupInfo from '../signup/SignupInfoPage';
import SignupGuardianIntro from '../signup/SignupGuardianIntroPage';
import SignupGuardianForm from '../signup/SignupGuardianFormPage';
import SignupComplete from '../signup/SignupCompletePage';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';

type Step = 'profile' | 'info' | 'guardianIntro' | 'guardianForm' | 'complete';

function SignupPage() {
  const [step, setStep] = useState<Step>('profile');

  const goToNext = (nextStep: Step) => setStep(nextStep);

  return (
    <>
      <GlobalTopNav type='signup' message='' />
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
