import { Oval } from "react-loader-spinner";

type LoadingForButtonType = {
  height: string;
  width: string;
};

const LoadingForButton = ({ height, width }: LoadingForButtonType) => {
  return (
    <Oval
      height={height}
      width={width}
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      strokeWidth={2}
      strokeWidthSecondary={5}
    />
  );
};

export default LoadingForButton;
