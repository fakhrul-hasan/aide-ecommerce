'use client';
import Cart from '@/components/Cart';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const page = () => {
    const {user, loading} = useAuth();
    const router = useRouter();
    if(loading){
        return <div className='mx-auto font-medium text-lg'>Loading...</div>
    }
    if(user){
        return(
            <Cart />
        )
    }
    return router.push('/signIn');
};

export default page;