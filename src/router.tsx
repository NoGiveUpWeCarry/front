import { routers } from '@_constants/routers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route {...routers.home} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
