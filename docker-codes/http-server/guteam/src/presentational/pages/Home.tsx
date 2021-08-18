import { VFC } from 'react';

import ToolBar from '../organisms/ToolBar';
import Rows from '../organisms/Rows';
import Footer from '../organisms/Footer';

const Home: VFC = () => (
  <div>
    <ToolBar />
    <Rows />
    <Footer />
  </div>
);
export default Home;
