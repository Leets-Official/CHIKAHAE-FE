import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';

import requiredTerms from '@/assets/terms/required-terms.md?raw';
import requiredPrivacy from '@/assets/terms/required-privacy.md?raw';
import optionalPrivacy from '@/assets/terms/optional-privacy.md?raw';

const TERMS_MAP: Record<string, string> = {
  'required-terms': requiredTerms,
  'required-privacy': requiredPrivacy,
  'optional-privacy': optionalPrivacy,
};
const MESSAGES_MAP: Record<string, string> = {
  'required-terms': '치카해 서비스 이용약관',
  'required-privacy': '[필수] 개인정보 수집 및 이용에 대한 동의',
  'optional-privacy': '[선택] 개인정보 수집 및 이용에 대한 동의',
};

const TermsPage = () => {
  const { type } = useParams<{ type: string }>(); // URL 파라미터
  const [content, setContent] = useState('');
  const [navMessage, setNavMessage] = useState('');

  useEffect(() => {
    if (type && TERMS_MAP[type]) {
      setContent(TERMS_MAP[type]);
      setNavMessage(MESSAGES_MAP[type] || '');
    } else {
      setContent('');
      setNavMessage('');
    }
  }, [type]);

  return (
    <div className='flex flex-col w-[320px] h-screen mx-auto'>
      <GlobalTopNav message={navMessage} showCancel={false} />
      <div className='flex-1  pt-15 min-w-full text-[12px] leading-[14px] tracking-[-0.12px]'>
        {content ? (
          <div className='prose prose-sm max-w-none' style={{ whiteSpace: 'pre-wrap' }}>
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
