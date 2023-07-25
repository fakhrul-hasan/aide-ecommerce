import React from 'react';

const Header = ({text}) => {
    return (
        <div className='print-header' style={{ textAlign: 'center', fontSize: '16px', marginBottom: '20px' }}>
      <h2 style={{fontSize:'30px', fontWeight:'bold', color:'#9155fd'}}>{text}</h2>
  <h5 style={{fontSize:'16px', fontWeight:'600', color:'#9155fd'}}>Prepared By: Md Fakhrul Hasan</h5>
    </div>
    );
};

export default Header;