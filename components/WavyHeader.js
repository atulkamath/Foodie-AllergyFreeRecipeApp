import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
export default function WavyHeader({ customStyles }) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: "#00cba9", height: 160 }}>
        <Svg
          height="90%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: 130 }}
        >
          <Path
            fill="#00cba9"
            d="M0,64L80,106.7C160,149,320,235,480,266.7C640,299,800,277,960,240C1120,203,1280,149,1360,122.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}
