import React from 'react';
import Link from 'next/link';

const Navbar = () =>{
    return(
        <div>
           <nav>
      <menu>
        <Link prefetch={false} href="/">Home</Link>
        <Link prefetch={false} href="/about">About</Link>
      </menu>
    </nav>
        </div>
    )
}

export default Navbar