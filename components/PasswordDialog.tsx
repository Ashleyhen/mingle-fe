import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
} from 'react-native';

const PasswordDialog: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSave = (): void => {
        if (password === confirmPassword) {
            alert('Passwords match!');
            setModalVisible(false);
        } else {
            alert('Passwords do not match!');
        }
    };

    const handleBack = (): void => {
        alert('Back button clicked!');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    onPress={(event: GestureResponderEvent) => setModalVisible(true)}
                    style={styles.openButton}
                >
                    <Text style={styles.buttonText}>Open Dialog</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={(event: GestureResponderEvent) => handleBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Enter Password</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={(text: string) => setPassword(text)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={(text: string) => setConfirmPassword(text)}
                        />

                        <View style={styles.buttonContainer}>
                            <Button title="Save" onPress={handleSave} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    openButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    backButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        padding: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
});

export default PasswordDialog;