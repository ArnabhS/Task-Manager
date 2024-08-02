import Subscribe from '@/components/Subscription';

const page = ({params}) => {
  return <Subscribe userId={params.userId} />;
};

export default page;
