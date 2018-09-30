import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    
    static navigationOptions = (props) => {
        const { navigate } = props.navigation;
        return {
            headerRight: (
                <Button 
                    title="Settings" 
                    onPress={() => navigate('settings')} 
                    backgroundColor="rgba(0,0,0,0)"   
                    color="rgba(0, 122, 255, 1)" 
                />
            ),
            style: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            }
        };
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {

            const { company, created_at, url, title, id } = job; 
            const initialRegion = {
                longitude: -122.0321823,
                latitude: 37.3229978,
                longitudeDelta: 0.02,
                latitudeDelta: 0.045
            };
            
            return (
                <Card title={title} key={id}>
                    <View style={{ height: 200 }}>
                        <MapView 
                            style={{flex: 1}} 
                            cacheEnabled={Platform.OS === 'android'}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailedWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{created_at}</Text>
                        </View>
                        <Button 
                            title="Apply Now"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = { 
    detailedWrapper: {
        marginTop: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
}

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);