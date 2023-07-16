import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Providers from '@/providers';
import React from 'react';

const WithLayout = ({children}) => {
    return (
        <div className="container mx-auto">
            <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
        </div>
    );
};

export default WithLayout;