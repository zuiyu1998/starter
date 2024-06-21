import { useRef, useImperativeHandle, forwardRef } from 'react';
import animationData from '/@/assets/lotties/loading.json';
import { Player } from '@lottiefiles/react-lottie-player';

export interface LoadingLottieRef {
  setSeeker(seek: number): void;
}

export const LoadingLottie = forwardRef<LoadingLottieRef, unknown>(
  function LoadingLottie(_props, ref) {
    const playerRef = useRef<Player>(null);

    function setSeeker(seek: number) {
      playerRef.current?.setSeeker(seek);
    }

    useImperativeHandle(
      ref,
      () => {
        return {
          setSeeker,
        };
      },
      []
    );

    return <Player ref={playerRef} src={animationData} />;
  }
);
