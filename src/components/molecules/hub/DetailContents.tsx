import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

interface DetailContentsProps {
  content: string;
}

const DetailContents = ({ content }: DetailContentsProps) => {
  const getContent = (html: string) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return parse(sanitizedHtml);
  };

  return (
    <div className='flex flex-col prose max-w-none border min-h-[600px] rounded-[10px] p-[10px]'>
      {getContent(content)}
    </div>
  );
};

export default DetailContents;
