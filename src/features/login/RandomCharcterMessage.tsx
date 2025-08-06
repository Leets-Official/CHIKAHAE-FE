interface RandomCharacterMessageProps {
  index: number;
}

import { CHARACTER_MESSAGES } from '@/constants/characterMessages';

const RandomCharacterMessage = ({ index }: RandomCharacterMessageProps) => {
  const { main, sub, Svg } = CHARACTER_MESSAGES[index];

  const renderMain = () => {
    if (Array.isArray(main)) {
      return main.map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ));
    }

    return main;
  };

  return (
    <>
      <div className='flex flex-col gap-3.25 items-center pt-5'>
        <p className='text-fg-accent-blue-weak text-[26px] font-extrabold leading-[30px] tracking-[-0.26px] break-normal text-center max-w-[300px]'>
          {renderMain()}
        </p>
        <p className='text-[16px] font-bold tracking-[-0.16px] text-fg-strong leading-none'>
          <span className='block'>{sub}</span>
          <span className='block'></span>
        </p>
      </div>
      <div className='flex flex-col items-center'>
        <Svg />
      </div>
    </>
  );
};

export default RandomCharacterMessage;
