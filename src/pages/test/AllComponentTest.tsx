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
        {/* <section>
          <TextButtonTest />
        </section> */}
        <section>
          <RadioButtonContainer
            message='성별'
            importance='important'
            variant='default'
            options={GENDER}
            selectedValue={null}
            onValueChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />
        </section>
        <section>
          <InputContainer
            label='예시'
            placeholder='예시'
            value={''}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.');
            }}
          />
        </section>
        <section>
          <UserInfoForm
            type={'full'}
            gender={''}
            onGenderChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
            birthDate={''}
            onBirthDateChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default AllComponentsTest;
