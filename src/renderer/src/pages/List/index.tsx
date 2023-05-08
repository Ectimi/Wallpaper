import { FC } from 'react';
import { useParams } from 'react-router-dom';

export const List: FC = () => {
  const params = useParams();
  console.log(params);
  return <div>list</div>;
};
