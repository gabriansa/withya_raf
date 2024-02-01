import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';


const SettingsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            
            <View style={styles.barContainer}>
                <View style={styles.settingsTextContainer}>
                    <Text style={styles.settingsText}>Settings</Text>
                </View>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                        <Ionicons name="arrow-forward-circle" size={50} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.settingsContainer}>
                <View style={styles.settingsSectionContainer}>
                    <View style={styles.groupTitleContainer}>
                        <Text style={styles.groupTitleText}>Account</Text>
                    </View>
                    <View style={styles.groupOptionsContainer}>
                        <View style={styles.iconSettingContainer}>
                            <Ionicons name="call" size={24} color="white" />
                        </View>
                        <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                            <Text style={styles.nameSettingText}>Phone number</Text>
                        </TouchableOpacity>
                        <View style={styles.valueSettingContainer}>
                            <Text style={styles.valueSettingText}>+11234567890</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.settingsSectionContainer}>
                    <View style={styles.groupTitleContainer}>
                        <Text style={styles.groupTitleText}>About</Text>
                    </View>
                    <View style={styles.groupOptionsContainer}>
                        <View style={styles.iconSettingContainer}>
                            <Ionicons name="newspaper" size={24} color="white" />
                        </View>
                        <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                            <Text style={styles.nameSettingText}>Terms of Use</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.groupOptionsContainer}>
                        <View style={styles.iconSettingContainer}>
                            <Ionicons name="lock-closed-outline" size={24} color="white" />
                        </View>
                        <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                            <Text style={styles.nameSettingText}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.groupOptionsContainer}>
                        <View style={styles.iconSettingContainer}>
                            <Ionicons name="ellipse" size={24} color="white" />
                        </View>
                        <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                            <Text style={styles.nameSettingText}>withya for iOS</Text>
                        </TouchableOpacity>
                        <View style={styles.valueSettingContainer}>
                            <Text style={styles.valueSettingText}>v0.1</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.settingsSectionContainer}>
                    <View style={styles.groupOptionsContainer}>
                        <View style={styles.iconSettingContainer}>
                            <Ionicons name="exit-outline" size={24} color="#FF644E" />
                        </View>
                        <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                            <Text style={[styles.nameSettingText, { color: '#FF644E' }]}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.groupOptionsContainer}>
                        <View style={styles.iconSettingContainer}>
                            <Ionicons name="call" size={24} color="white" opacity="0" />
                        </View>
                        <TouchableOpacity onPress={() => {/* Handle create account navigation */}}>
                            <Text style={[styles.nameSettingText, { color: 'gray'}]}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1D',
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '95%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1A1A1A',
        marginTop: 10,
        paddingHorizontal: 5,
    },
    settingsTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    backButtonContainer: {
        position: 'absolute',
        right: 0,
    },
    settingsContainer: {
        flex: 1,
        marginTop: 20,
        // backgroundColor: 'blue',
    },
    settingsSectionContainer: {
        marginBottom: 40,
        // backgroundColor: 'orange',
    },
    settingsText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18
    },
    groupTitleContainer: {
        marginLeft: 14,
        marginBottom: 5,
    },
    groupTitleText: {
        color: 'gray',
        textTransform: 'uppercase',
        fontSize: 14
    },
    groupOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2C2B2D',
        minHeight: 45,
        paddingHorizontal: 20,
    },
    iconSettingContainer: {
        marginRight: 10,
    },
    nameSettingContainer: {

    },
    nameSettingText: {
        color: 'white',
        fontSize: 18,
    },
    valueSettingContainer: {
        position: 'absolute',
        right: 20,
    },
    valueSettingText: {
        color: 'white',
        fontSize: 18,
        opacity: 0.5,
    },
});

export default SettingsScreen;
