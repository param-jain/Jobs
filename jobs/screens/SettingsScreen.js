import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions/job_actions';
import { Button } from 'react-native-elements';

class SettingsScreen extends Component {

    onButtonPress = () => {
        AsyncStorage.removeItem('fb_token');
        this.props.navigation.navigate('auth');
    }

    render() {
        return (
            <View>
               <Button 
                   title="Reset Liked Jobs"
                   large
                   icon={{ name: 'delete-forever' }}
                   backgroundColor="#F44336"
                   onPress={this.props.clearLikedJobs}
                   style = {{ marginTop: 30 }}
               />
               <Button
                   title="Log Out"
                   large
                   icon={{ name: 'delete-forever' }}
                   backgroundColor="#A23B56"
                   onPress={this.onButtonPress}
                   style = {{ marginTop: 30 }}
               />  
            </View>
        );
    }
}

export default connect(null, clearLikedJobs)(SettingsScreen);