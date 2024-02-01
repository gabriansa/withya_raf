import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import colors from './colors';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

const CELL_COUNT = 5;
const RESEND_TIMEOUT = 30; // 30 seconds for resend timeout

const VerificationCodeScreen = () => {
    const [value, setValue] = useState('');
    const isCodeComplete = value.length === CELL_COUNT;
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [timer, setTimer] = useState(RESEND_TIMEOUT);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setCanResend(true);
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleResendCode = () => {
        // Reset timer
        setTimer(RESEND_TIMEOUT);
        setCanResend(false);
        // Implement code resend functionality here
        console.log(value)
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.cancelButtonContainer}>
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name="close" size={35} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Enter your verification code</Text>
                </View>

                <View style={styles.sentToContainer}>
                    <Text style={styles.smallText}>Sent to xxxxxxxxxx</Text>
                    <View style={styles.editButtonContainer}>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.codeContainer}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFiledRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                    <View
                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}>
                        <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                    )}
                />
                </View>

                <View style={styles.noCodeButtonContainer}>
                    {canResend ? (
                        <TouchableOpacity onPress={handleResendCode}>
                            <Text style={styles.buttonText}>Resend Code</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.smallText}>Resend code in {timer} seconds</Text>
                    )}
                </View>

                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity disabled={!isCodeComplete} onPress={() => {}}>
                        <Ionicons name="arrow-forward-circle" size={60} color={isCodeComplete ? colors.off_white : colors.gray} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.dummyContainer}></View>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    mainContainer: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    dummyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sentToContainer: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'flex-start',
        marginBottom: 30,
    },
    codeContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    titleContainer: {
        marginBottom: 20,
    },
    titleText: {
        color: 'white',
        fontSize: 28,
        fontWeight: '600',
    },
    smallText: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'left',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    nextButtonContainer: {
        marginBottom: 20,
        width: '85%',
        alignSelf: 'center',
        alignItems: 'flex-end'
    },
    cancelButtonContainer: {
        opacity: '0.2',
        marginTop: 10,
        width: '85%',
        alignSelf: 'center',
        alignItems: 'flex-end',
    },
    noCodeButtonContainer: {
        width: '85%',
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    editButtonContainer: {
        marginLeft: 10,
    },

    codeFiledRoot: {
        marginTop: 10,
        width: '85%',
    },
    cellRoot: {
        width: 40,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    cellText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '600',
    },
    focusCell: {
        borderBottomColor: 'white',
        borderBottomWidth: 3,
    },
    });
    export default VerificationCodeScreen;
