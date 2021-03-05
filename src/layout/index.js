import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HiSearch, HiOutlineShoppingCart } from 'react-icons/hi';

import * as Styles from './styles';

import { useCartContext } from '../context/Cart';

export default function Layout({ children }) {
  const router = useRouter();

  const { items } = useCartContext();

  const [showTooltip, setShowTooltip] = useState(false);
  const [changeItems, setChangeItems] = useState({
    quantity: items?.length ?? 0, toggle: false,
  });

  useEffect(() => {
    setChangeItems((value) => {
      const change = value.quantity < items.length;
      const toggle = change ? !value.toggle : value.toggle;
      const quantity = items.length;
      return { quantity, toggle };
    });
  }, [items]);

  useEffect(() => {
    if (router.pathname === '/cart') return;
    if (router.pathname === '/payment/[id]') return;
    if (items?.length === 0) return;
    setTimeout(() => { setShowTooltip(true); }, 1000);
    setTimeout(() => { setShowTooltip(false); }, 8000);
  }, [changeItems.toggle]);

  useEffect(() => { setShowTooltip(false); }, [router.pathname]);

  const handleGoToCart = () => router.push('/cart');
  const handleGoToHome = () => router.push('/');

  return (
    <div className="bg-light">
      <nav className="navbar sticky-top navbar-dark bg-primary">
        <div className="container">
          <p
            role="button"
            className="m-0 navbar-brand"
            onClick={handleGoToHome}
            aria-hidden="true"
          >
            Store
          </p>

          <div className="input-group w-50">
            <input type="text" className="form-control" placeholder="O que você procura?" />
            <button type="button" className="btn btn-outline-light bg-primary">
              <HiSearch color="white" size={24} />
            </button>
          </div>

          <Styles.CartButton className="btn btn-primary text-light" onClick={handleGoToCart}>
            <HiOutlineShoppingCart size={32} />
            <span className="badget bg-light text-primary">{items?.length ?? 0}</span>
            {showTooltip && (
              <span className=" cart-tooltip p-2 px-3 rounded bg-light text-primary shadow-lg">
                Você tem produto adicionado ao carrinho
              </span>
            )}
          </Styles.CartButton>
        </div>
      </nav>

      <main className="container">
        {children}
      </main>
    </div>
  );
}
