import DateText from '@/components/atoms/DateText';

const FeedTemplate = () => {
  return (
    <div>
      Feed
      <DateText date={new Date().toISOString()} />
    </div>
  );
};

export default FeedTemplate;
