import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe'

import * as actions from '../actions';

class DeckScreen extends Component {

    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="description" size={25} color={tintColor} />;
        }
    }

    renderCard(job) {

        const initialRegion = {
            longitude: -122.0321823,
            latitude: 37.3229978,
            longitudeDelta: 0.02,
            latitudeDelta: 0.045
        };

        return (
            <Card title={job.title} style={{ Top: 100 }}>
                <View style={{ height: 300 }}>
                    <MapView 
                        scrollEnable={false}
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android' ? true : false}
                        initialRegion={initialRegion}
                    >
                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.created_at}</Text>
                </View>
                <Text style={{ height: 150 }}>
                    {job.how_to_apply.replace(/<p>/g, '').replace(/<\/p>/g, '')
                        .replace(/<a href="/g, '').replace(/<\/a>/g, '').replace(/>/g, '\n\n')}
                </Text>
            </Card>
        );
    }

    renderNoMoreCards = () => {
        return (
            <Card title="No More Jobs">
                <Button 
                    title="Back to Map"
                    large
                    icon={{ name: 'my-location' }}
                    backgroundColor="#03A9F4"
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }

    render() {
        return (
            <View>
                <Swipe 
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                    keyProp="id"
                />
            </View>
        );
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    }
};

function mapStateToProps ({ jobs }) {
    return { jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);