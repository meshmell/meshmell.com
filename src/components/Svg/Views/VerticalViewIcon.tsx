type VerticalViewIconType = {
  style?: React.CSSProperties;
};

const VerticalViewIcon = ({ style }: VerticalViewIconType) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 625 625"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <circle cx="205.473" cy="533.843" r="70.324" />
      <circle cx="205.473" cy="312.5" r="70.324" />
      <circle cx="205.473" cy="91.157" r="70.324" />
      <circle cx="419.527" cy="533.843" r="70.324" />
      <circle cx="419.527" cy="312.5" r="70.324" />
      <circle cx="419.527" cy="91.157" r="70.324" />
    </svg>
  );
};

export default VerticalViewIcon;
