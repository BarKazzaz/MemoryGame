import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles/marker.css'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Marker = (props) => {
    const { color, name, id } = props;
    return (
        <div className="marker"
            style={{ backgroundColor: color, cursor: 'pointer' }}
            title={name}
        />
    );
};

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 31.968910,
            lng: 34.770729
        },
        zoom: 2
    };

    componentDidMount(){
        // TODO: request all countries lat and lng
    }

    render() {
        return (

            // Important! Always set the container height explicitly
            <div style={{ marginLeft: '25%', height: '50%', width: '50%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBfOzLwfaP6BEPAMGeVS5oR_ayizWAHn4Q' }}
                    defaultCenter={this.props.center}
                    center={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Marker
                        color='blue'
                        style={this.markerStyle}
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                    <Marker
                        color='blue'
                        style={this.markerStyle}
                        lat={0.0}
                        lng={30.337844}
                        text="Another Marker"
                    />
                </GoogleMapReact>
            </div>

        );
    }
}

export default Map;