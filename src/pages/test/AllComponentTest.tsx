import { Link } from 'react-router-dom';
import TextButtonTest from './TextButtonTest';
import RadioButtonTest from './RadioButtonTest';

import NavTest from './NavTest';

const AllComponentsTest = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='p-8 space-y-10'>
        <section>
          <NavTest />
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>RadioButton</h2>
          <RadioButtonTest />
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>TextButton</h2>
          <TextButtonTest />
        </section>
      </div>
    </div>
  );
};

export default AllComponentsTest;
