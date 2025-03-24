import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

interface ContentsBodyProps {
  body: string;
}

const ContentsBody = ({ body }: ContentsBodyProps) => {
  const getTruncatedContent = (html: string) => {
    const sanitizedHtml = DOMPurify.sanitize(html, { FORBID_TAGS: ['img'] });
    return parse(sanitizedHtml);
  };
  return (
    <div className='line-clamp-3 text-sm text-[rgb(72, 72, 74)]'>
      {getTruncatedContent(body)}
    </div>
  );
};

export default ContentsBody;
