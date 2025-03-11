import { Helmet } from 'react-helmet-async';
import logo from '@/assets/logos/PAD.svg';

interface MetaTagProps {
  title?: string;
  description?: string;
  url?: string;
  imgSrc?: string;
}

const MetaTag = ({ title, description, imgSrc, url }: MetaTagProps) => {
  const fullUrl = url
    ? `${'https://p-a-d.store'}${url}`
    : 'https://p-a-d.store';
  const originDescription =
    '개발자, 아티스트, 디자이너를 위한 소셜 커뮤니티 PAD. 팀원 모집부터 실시간 소통까지!';
  const originTitle = 'PAD | 모두를 위한 소셜 커뮤니티';

  return (
    <Helmet>
      <title>{title ? `PAD | ${title}` : originTitle}</title>
      <meta name='description' content={description || originDescription} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title || originTitle} />
      <meta property='og:site_name' content='PAD' />
      <meta
        property='og:description'
        content={description || originDescription}
      />
      <meta property='og:image' content={imgSrc || logo} />
      <meta property='og:url' content={fullUrl} />
    </Helmet>
  );
};

export default MetaTag;
