type PerspectiveViewIconType = {
  style?: React.CSSProperties;
};

const PerspectiveViewIcon = ({ style }: PerspectiveViewIconType) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 625 625"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <circle cx="135.417" cy="427.083" r="114.583" />
      <circle cx="489.583" cy="427.083" r="114.583" />
      <circle cx="220.023" cy="229.167" r="62.5" />
      <circle cx="406.25" cy="229.167" r="62.5" />
      <ellipse cx="362.535" cy="116.668" rx="39.549" ry="39.582" />
      <ellipse cx="262.5" cy="116.7" rx="39.583" ry="39.617" />
    </svg>
  );
};

export default PerspectiveViewIcon;
