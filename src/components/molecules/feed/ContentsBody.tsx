import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

interface ContentsBodyProps {
  body: string;
}

const ContentsBody = ({ body }: ContentsBodyProps) => {
  const getTruncatedContent = (html: string) => {
    const modifiedHtml = html
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<ul[^>]*>.*?<\/ul>/gi, '')
      .replace(/<ol[^>]*>.*?<\/ol>/gi, '')
      .replace(/<li[^>]*>/gi, '')
      .replace(/<\/li>/gi, '')
      .replace(/<(b|i|u|p|a|strong|em|span)>/gi, '<span>')
      .replace(/<\/(b|i|u|p|a|strong|em)>/gi, '</span>');

    const sanitizedHtml = DOMPurify.sanitize(modifiedHtml, {
      ALLOWED_TAGS: ['span'],
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
