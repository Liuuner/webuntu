const Battery = ({ level, isCharging }: { level: number, isCharging: boolean }) => {
  const maxBatteryLevelWidth = 49;
  const minBatteryLevelWidth = 3;
  const batteryLevelWidth = level * (maxBatteryLevelWidth - minBatteryLevelWidth) + minBatteryLevelWidth;

  const batteryColor = () => {
    if (isCharging) {
      return "green";
    } else if (level < 0.1) {
      return "red";
    } else if (level < 0.25) {
      return "orange";
    }
    return "white";
  };

  return (
    <svg
      fill="#FFF"
      style={{ aspectRatio: 800 / 426.6 }}
      height="100%"
      viewBox="0 0 60 31.999999"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(90,37,23)">
        <path
          d="M 42.536,4 H 36 V 0 H 24 V 4 H 17.464 C 15.554,4 14,5.554 14,7.464 V 56.536 C 14,58.446 15.554,60 17.464,60 H 42.535 C 44.446,60 46,58.446 46,56.536 V 7.464 C 46,5.554 44.446,4 42.536,4 Z M 44,56.536 C 44,57.344 43.343,58 42.536,58 H 17.464 C 16.657,58 16,57.344 16,56.536 V 7.464 C 16,6.656 16.657,6 17.464,6 H 24 36 42.536 C 43.343,6 44,6.656 44,7.464 Z" />
        <rect
          fill={batteryColor()}
          id="batteryLevel"
          rx="1"
          width={batteryLevelWidth}
          height="25.506134"
          x="-56.605736"
          y="17.251272"
          transform="rotate(-90)"
        />
        <path
          style={{ display: isCharging ? "inline" : "none" }}
          fill="white"
          id="chargingIcon"
          d="M 37,29 H 34 V 17.108 c 0.013,-0.26 -0.069,-0.515 -0.236,-0.72 -0.381,-0.467 -1.264,-0.463 -1.642,0.004 -0.026,0.032 -0.05,0.066 -0.072,0.103 l -9.9,15.979 c -0.191,0.309 -0.2,0.696 -0.023,1.013 C 22.303,33.804 22.637,34 23,34 h 4 l 0.002,12.929 h 0.001 c 0.001,0.235 0.077,0.479 0.215,0.657 0.189,0.247 0.529,0.414 0.84,0.414 0.305,0 0.636,-0.16 0.825,-0.398 0.04,-0.05 0.074,-0.103 0.104,-0.159 l 8.899,-16.979 c 0.163,-0.31 0.151,-0.682 -0.03,-0.981 C 37.675,29.184 37.35,29 37,29 Z"
        />
      </g>
    </svg>
  );
};

export default Battery;