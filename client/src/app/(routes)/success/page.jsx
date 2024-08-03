
import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Subscription Successful</h2>
      <p className="text-black">Thank you for subscribing!</p>
    </div>
  );
};

export default Success;
