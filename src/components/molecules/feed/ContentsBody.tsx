import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

interface ContentsBodyProps {
  body: string;
}

const ContentsBody = ({ body }: ContentsBodyProps) => {
  const getTruncatedContent = (html: string) => {
    const newHtml = html.replaceAll('<br>', ' ');
    const sanitizedHtml = DOMPurify.sanitize(newHtml, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });

    const textWithSpaces = sanitizedHtml.replace(/\.([^ ])/g, '. $1');

    return parse(textWithSpaces);
  };
  return (
    <div className='line-clamp-3 text-sm text-[rgb(72, 72, 74)]'>
      {getTruncatedContent(body)}
    </div>
  );
};

export default ContentsBody;
