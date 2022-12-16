type Props = {
  time: number;
};

export const Timer = ({ time }: Props) => {
  const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);

  const addZero = (time: number) => {
    return time < 10 ? "0" + time : time;
  };

  return <>{`${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`}</>;
};
