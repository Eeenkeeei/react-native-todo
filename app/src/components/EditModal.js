import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native';
import {THEME} from "../theme";

export const EditModal = ({visible, onCancel, value, onSave}) => {
    const [title, setTitle] = useState(value);

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Ошибка', `Минимальная длина названия 3 символа. Сейчас ${title.trim().length} символов`)
        } else {
            onSave(title)
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}>
            <View style={styles.wrap}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input} placeholder="Введите название"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={64}
                />
                <View style={styles.buttons}>
                    <Button title={"Отменить"} color={THEME.DANGER_COLOR} onPress={onCancel}/>
                    <Button title={"Cохранить"} onPress={saveHandler}/>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    wrap: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
});
