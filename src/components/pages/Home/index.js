import { useRouter } from 'next/router';
import { HiStar } from 'react-icons/hi';

import * as Styles from './styles';

import ProductsList from '../../ProductList';

import banner1 from '../../../assets/images/banner1.webp';
import banner2 from '../../../assets/images/banner2.webp';
import banner3 from '../../../assets/images/banner3.webp';

export default function Home() {
  const router = useRouter();

  const handleOnClickClub = () => router.push('/club');

  return (
    <Styles.Home>

      <Styles.Banner className="py-4 mt-4 text-center text-light bg-danger rounded">
        <div className="title">
          <HiStar />
          CLUBE DE OFERTAS
          <HiStar />
        </div>

        <button
          type="button"
          className="mt-3 btn btn-outline-light btn-lg"
          onClick={handleOnClickClub}
        >
          Clique aqui para fazer parte
        </button>
      </Styles.Banner>

      <Styles.Carousel className="my-4 carousel carousel-dark slide rounded" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src={banner1} className="d-block w-100" alt="banner" />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={banner2} className="d-block w-100" alt="banner" />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={banner3} className="d-block w-100" alt="banner" />
          </div>
        </div>
      </Styles.Carousel>

      <h3 className="py-5 text-center text-light bg-primary rounded">
        Encontre aqui as nossas principais ofertas
      </h3>

      <ProductsList />

    </Styles.Home>
  );
}
