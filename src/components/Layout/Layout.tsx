import { ReactNode } from 'react';

import styles from './Layout.module.scss';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout = ({children}: ILayoutProps) => {
  return (
    <main className={styles['layout']}>
      <nav className={styles['nav']}>
        <a href='/'><img src="/icons/logo.svg" alt="apollo42"/></a>
      </nav>
      <div>
        {children}
      </div>
    </main>
  );
};