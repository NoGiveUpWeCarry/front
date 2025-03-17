import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

interface ContentsBodyProps {
  body: string;
}

const ContentsBody = ({ body }: ContentsBodyProps) => {
  const getTruncatedContent = (html: string) => {
    const sanitizedHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'b',
        'i',
        'u',
        'p',
        'a',
        'strong',
        'em',
        'span',
        'ul',
        'ol',
        'li',
        'br',
      ], // img 제외
      ALLOWED_ATTR: ['href', 'title'],
    });
    return parse(sanitizedHtml);
  };

  return (
    <div className='line-clamp-3 text-sm text-[rgb(72, 72, 74)]'>
      {getTruncatedContent(body)}
    </div>
  );
};

export default ContentsBody;
