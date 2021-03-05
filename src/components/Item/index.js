import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

import * as Styles from './styles';

import { formatBRL } from '../../utils/functions';

export default function Item({ product, width = 256 }) {
  const router = useRouter();

  const [time, setTime] = useState('');

  const timeToFinishOffer = setInterval(() => {
    const now = moment();
    const finish = moment().hour(23).minute(59).seconds(59);

    const ms = moment(finish).diff(moment(now));
    const d = moment.duration(ms);
    const s = Math.floor(d.asHours()) + moment.utc(ms).format(':mm:ss');
    setTime(s);
  }, 100);

  useEffect(() => () => { clearInterval(timeToFinishOffer); }, []);

  const handleOnClick = () => router.push(`/product/${product.id}`);

  return (
    <Styles.Item width={width} className="card" onClick={handleOnClick} aria-hidden="true">
      <img src={product.image} className="card-img-top" alt="..." />

      <div className="d-flex w-100 justify-content-center">
        <div className="px-3 bg-danger text-light rounded text-center">
          <b>{`Acaba em: ${time}`}</b>
        </div>
      </div>

      <div className="card-body">
        <p className="card-title">{product.name}</p>
        <h4 className="card-text text-primary m-0">{formatBRL(product.value)}</h4>
        <p className="card-text text-secondary">{`12x de ${formatBRL(product.value / 12)} sem juros`}</p>
      </div>
    </Styles.Item>
  );
}
