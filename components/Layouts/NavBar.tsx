import clsx from 'clsx';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import Image from 'next/image';

export const NavBar = () => {
  return (
    <nav>
      <div className="absolute m-8 top-0 left-0 flex gap-8 items-center z-50">
        <Image
          src="/decent-icon-black.png"
          alt="Decent Logo"
          height={40}
          width={48}
        />
      </div>
      <div
        className={clsx(
          'flex flex-wrap items-center justify-end gap-1',
          'fixed inset-0 bottom-auto z-10',
          'my-8 mx-4 md:mx-20'
        )}
      >
        <RainbowConnectButton />
      </div>
    </nav>
  );
};
