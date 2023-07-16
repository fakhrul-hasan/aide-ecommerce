'use client';
import Cart from '@/components/Cart';
import UseAuth from '@/hooks/useAuth';

const page = () => {
    const {user, loading} = UseAuth();
    if(loading){
        return <div className='mx-auto font-medium text-lg'>Loading...</div>
    }
    if(user){
        return(
            <Cart />
        )
    }
    if (typeof window !== 'undefined') {
        return window.location.href = '/signIn';
      }
    
      return null;
};

export default page;