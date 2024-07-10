import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { LoadingLottie, LoadingLottieRef } from './views/sys/loading';

import { initStore } from '/@/store/index';
import { Router } from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { timeout } from './utils/promise_utils';

function Main() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [target] = useState(1);

  const playerRef = useRef<LoadingLottieRef | null>(null);
  const [loading, setLoading] = useState(true);

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

    async function delay() {
      return await timeout(1000);
    }

    async function init() {
      try {
        await Promise.all([bootstrap(), delay()]);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, []);

  if (loading) {
    return (
      <div className='w-full h-full'>
        <LoadingLottie ref={playerRef} />
      </div>
    );
  }

  return <Main />;
}

export default App;
