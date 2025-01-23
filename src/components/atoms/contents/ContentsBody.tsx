import DOMPurify from 'dompurify';

interface ContentsBodyProps {
  body: string;
  sliceBody?: boolean;
}

const ContentsBody = ({ body }: ContentsBodyProps) => {
  const getTruncatedContent = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = DOMPurify.sanitize(html);
    const textContent = tempDiv.textContent || '';
    const sentences = textContent.match(/([^.!?]+[.!?]+)/g) || [];
    const truncatedText =
      sentences.slice(0, 5).join(' ') + (sentences.length > 5 ? '...' : '');
    tempDiv.innerHTML = DOMPurify.sanitize(truncatedText);
    return { __html: tempDiv.innerHTML };
  };

  return <div dangerouslySetInnerHTML={getTruncatedContent(body)}></div>;
};

export default ContentsBody;
