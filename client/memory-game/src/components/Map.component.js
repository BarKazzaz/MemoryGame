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
    constructor(props) {
        super(props);
        this.state = {
            countries: props.countries,
            status: 'pending'
        }
        this.renderMarkers = this.renderMarkers.bind(this);
    }
    static defaultProps = {
        center: {
            lat: 31.968910,
            lng: 34.770729
        },
        zoom: 2
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.countries !== this.props.countries) {
            console.log("updating", this.props.countries)
            this.setState({ countries: this.props.countries })
        }
    }

    componentDidMount() {
        // TODO: request all countries lat and lng
        // fetch(`${SERVER_ADDRESS}/api/getAllCountries`)
        //     .then(res => res.json())
        //     .then(data => { console.log(data); return new Promise((resolve, reject)=> resolve(data)) })
        //     .then(data => this.setState({ status: 'ready', countries: data.content }))
        //     .then(() => { console.log(this.state.countries) })
        //     .catch(err => { console.log(err) });
    }

    renderMarkers() {
        return this.state.countries.map((e, i) => {
            return <Marker
                color='blue'
                style={this.markerStyle}
                lat={e.coordinates.lat}
                lng={e.coordinates.lng}
                text={e.country}
            />
        })
    }

    render() {
        if (this.state.status === 'ready')
            return (
                // Important! Always set the container height explicitly
                <div style={{ marginLeft: '25%', height: '50%', width: '50%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBfOzLwfaP6BEPAMGeVS5oR_ayizWAHn4Q' }}
                        defaultCenter={this.props.center}
                        center={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {this.renderMarkers()}
                    </GoogleMapReact>
                </div>

            );
        else if (this.state.status === 'pending') {
            if (this.state.countries) this.setState({ status: 'ready' })
            return (
                <div style={{ backgroundColor: 'grey', marginLeft: '25%', height: '50%', width: '50%' }}>
                    <p>Loading...</p>
                </div>
            )
        }
    }
}

export default Map;