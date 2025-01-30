import DOMPurify from 'dompurify';

interface ContentsBodyProps {
  body: string;
}

const ContentsBody = ({ body }: ContentsBodyProps) => {
  const getTruncatedContent = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = DOMPurify.sanitize(html);
    const textContent = tempDiv.textContent || '';

    const sentences = textContent.match(/([^.!?]+[.!?]+)/g) || [];

    const truncatedText =
      sentences.length > 5
        ? sentences.slice(0, 5).join(' ') + '...'
        : textContent;

    tempDiv.innerHTML = DOMPurify.sanitize(truncatedText);
    return { __html: tempDiv.innerHTML };
  };

  return <div dangerouslySetInnerHTML={getTruncatedContent(body)}></div>;
};

export default ContentsBody;
