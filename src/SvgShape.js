import React from 'react';
import { Animated } from 'react-native';

import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop,
} from 'react-native-svg';
import randomcolor from 'randomcolor';

class SvgExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: new Animated.Value(1),
    };
    this.isAnimating = false;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.animate && nextProps.animate) {
      this.isAnimating = true;
      Animated.sequence([
        Animated.timing(this.state.size,
          {
            toValue: 1.5,
            duration: 200,
          }),
        Animated.timing(this.state.size,
          {
            toValue: 1,
            duration: 200,
          }),
      ]).start(() => { this.isAnimating = false; });
    }
  }
  render() {
    return (
      <Animated.View style={{ transform: [{ scale: this.state.size }] }}>
        <Svg
          height={this.props.width}
          width={this.props.width}
        >
          <Circle
            cx={this.props.width / 2}
            cy={this.props.width / 2}
            r="45"
            stroke={this.props.strokeColor}
            strokeWidth="2.5"
            fill={this.props.fillColor}
          />
          <Text x="40" y="45" fontSize="10" fill="white" fontWeight="bold">{this.props.text}</Text>
        </Svg>
      </Animated.View>
    );
  }
}
export default SvgExample;
