// 퀴즈/양치 시작 화면 - noticeList

type NoticeListProps = {
  noticeList: string[];
};

const NoticeListBox = ({ noticeList }: NoticeListProps) => {
  return (
    <div className='inline-flex items-center px-[15px] pr-[49px] py-[25px] rounded-[8px] border-[2px] border-bg-primary-gray bg-fg-veryweak'>
      <ul className='list-disc pl-[16px] space-y-3'>
        {noticeList.map((text, index) => (
          <li key={index} className='body-12-r text-left text-fg-verystrong'>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeListBox;
