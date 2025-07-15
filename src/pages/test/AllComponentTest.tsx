import TextButtonTest from './TextButtonTest';
import NavTest from './NavTest';
import RadioButtonContainer from '@/components/ui/Button/RadioButton/RadioButtonContainer';
import InputContainer from '@/components/ui/Input/InputContainer';
import UserInfoForm from '@/components/ui/UserInfoForm';
import { GENDER } from '@/constants/radioOptions';
const AllComponentsTest = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='p-8 space-y-10'>
        <section>
          <NavTest />
        </section>
        <section>
          <TextButtonTest />
        </section>
        <section>
          <RadioButtonContainer
            message='성별'
            importance='important'
            variant='default'
            options={GENDER}
          />
        </section>
        <section>
          <InputContainer label='예시' placeholder='예시' />
        </section>
        <section>
          <UserInfoForm />
        </section>
      </div>
    </div>
  );
};

export default AllComponentsTest;
