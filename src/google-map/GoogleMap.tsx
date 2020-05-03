import React, {Component} from 'react';
import './GoogleMap.css';

class GoogleMap extends Component {
  private readonly googleMapRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.googleMapRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount(): void {
    new google.maps.Map(this.googleMapRef.current as Element, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  render() {
    return (
      <div id="map"
           ref={this.googleMapRef}>
      </div>
    );
  }
}

export default GoogleMap;
