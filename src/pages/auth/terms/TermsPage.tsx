import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { TERMS } from '@/constants/terms';
import type { TermType } from '@/constants/terms';

const TermsPage = () => {
  const { type } = useParams<{ type: TermType }>();
  const [content, setContent] = useState('');
  const [navMessage, setNavMessage] = useState('');

  useEffect(() => {
    if (type && TERMS[type]) {
      setContent(TERMS[type].content);
      setNavMessage(TERMS[type].message);
    } else {
      setContent('');
      setNavMessage('');
    }
  }, [type]);

  return (
    <div className='flex flex-col w-[320px] h-screen mx-auto'>
      <GlobalTopNav message={navMessage} showCancel={false} />
      <div className='flex-1  pt-15 text-[12px] leading-[14px] tracking-[-0.12px]'>
        {content ? (
          <div
            className='prose prose-sm max-w-none [&_h1]:text-[16px] [&_h1]:font-bold [&_h2]:text-[14px] [&_h2]:font-bold [&_h3]:text-[16px] [&_h3]:font-semibold'
            style={{ whiteSpace: 'pre-wrap' }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkBreaks, remarkGfm]}
              components={{
                ul: ({ node, ...props }) => <ul className='list-disc pl-4' {...props} />,
                ol: ({ node, ...props }) => <ol className='list-decimal pl-4' {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <p className='text-center text-fg-medium mt-10'>약관 내용 불러오는 중입니다.</p>
        )}
      </div>
    </div>
  );
};
export default TermsPage;
