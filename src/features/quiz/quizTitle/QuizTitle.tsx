import type { QuizTitleProps } from './QuizTitle.types';

const QuizTitle = ({ questionNumber, questionText }: QuizTitleProps) => {
  return (
    <div className='flex w-full max-w-[430px] min-w-[360px] px-[30px] flex-col items-center gap-2 text-center'>
      <div className='body-16-b text-[#2593BD]' style={{ lineHeight: '19px' }}>
        {questionNumber}번 문제
      </div>
      <div className='head-24-eb text-black' style={{ lineHeight: '38px' }}>
        {questionText}
      </div>
    </div>
  );
};

export default QuizTitle;
