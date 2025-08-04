import TextButton from '@/components/ui/TextButton';

const TextButtonTest = () => {
  return (
    <div className='flex justify-center align-center p-8 space-y-6 gap-2'>
      <div className='space-x-4 '>
        <TextButton size='small' variant='primary'>
          small 버튼
        </TextButton>
        <TextButton size='medium' variant='primary'>
          small 버튼
        </TextButton>
        <TextButton size='large' variant='primary'>
          small 버튼
        </TextButton>
        <TextButton size='extralarge' variant='primary'>
          small 버튼
        </TextButton>
      </div>
      <div className='space-x-4'>
        <TextButton size='small' variant='default'>
          small 버튼
        </TextButton>
        <TextButton size='medium' variant='default'>
          small 버튼
        </TextButton>
        <TextButton size='large' variant='default'>
          small 버튼
        </TextButton>
        <TextButton size='extralarge' variant='default'>
          small 버튼
        </TextButton>
      </div>
      <div className='space-x-4'>
        <TextButton size='small' variant='assistive'>
          small 버튼
        </TextButton>
        <TextButton size='medium' variant='assistive'>
          small 버튼
        </TextButton>
        <TextButton size='large' variant='assistive'>
          small 버튼
        </TextButton>
        <TextButton size='extralarge' variant='assistive'>
          small 버튼
        </TextButton>
      </div>
    </div>
  );
};

export default TextButtonTest;
