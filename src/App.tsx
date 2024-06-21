import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { LoadingLottie, LoadingLottieRef } from './views/sys/loading';

import { initStore } from '/@/store/index';
import { Router } from './router';

function App() {
  const [count, setCount] = useState(0);
  const [target] = useState(1);

  const playerRef = useRef<LoadingLottieRef | null>(null);

  const loading = useMemo(() => {
    if (count >= target) {
      return false;
    } else {
      return true;
    }
  }, [count, target]);

  const progress = useMemo(() => {
    return (count / target) * 100;
  }, [count, target]);

  useEffect(() => {
    playerRef.current?.setSeeker((progress / 100) * 84);
  }, [progress]);

  useEffect(() => {
    async function bootstrap() {
      //初始化store
      await initStore();
      setCount((pre) => pre + 1);
    }

    bootstrap();
  }, []);

  if (loading) {
    return (
      <div className='container'>
        <LoadingLottie ref={playerRef} />
      </div>
    );
  }

  return <Router />;
}

export default App;
