'use client';
import UseAuth from '@/hooks/UseAuth';
import { useRouter } from 'next/navigation';
import Cart from '@/components/Cart';

const page = () => {
    const {user, loading} = UseAuth();
    const router = useRouter();
    if(loading){
        return <div className='mx-auto font-medium text-lg'>Loading...</div>
    }
    if(user){
        return(
            <Cart />
        )
    }
    if (typeof window !== 'undefined') {
        router.push('/signIn');
      }
    
      return null;
};

export default page;