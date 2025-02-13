import DOMPurify from 'dompurify';

interface ContentsBodyProps {
  body: string;
}

const ContentsBody = ({ body }: ContentsBodyProps) => {
  const getTruncatedContent = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = DOMPurify.sanitize(html);
    const textContent = tempDiv.textContent || '';
    tempDiv.innerHTML = DOMPurify.sanitize(textContent);
    return { __html: tempDiv.innerHTML };
  };

  return (
    <div
      className='line-clamp-3'
      dangerouslySetInnerHTML={getTruncatedContent(body)}
    ></div>
  );
};

export default ContentsBody;
