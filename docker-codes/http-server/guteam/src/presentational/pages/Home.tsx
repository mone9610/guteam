import { VFC } from 'react';

import Header from '../organisms/Header';
import Rows from '../organisms/Rows';
import Footer from '../organisms/Footer';

const Home: VFC = () => (
  <div>
    <Header />
    <Rows />
    <Footer />
  </div>
);
export default Home;
