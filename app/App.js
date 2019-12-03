import React, {useState} from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import {Navbar} from './src/components/Navbar'
import {MainScreen} from './src/screens/MainScreen'
import {TodoScreen} from './src/screens/TodoScreen'
import * as Font from 'expo-font'
import {AppLoading} from "expo";
import {THEME} from "./src/theme";

async function loadApplication() {
    await Font.loadAsync({
        'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const [todoId, setTodoId] = useState(null)
    const [todos, setTodos] = useState([
        {id: '1', title: 'Выучить React Native'}
    ]);

    if (!isReady) {
        return <AppLoading // если нужно заставить приложение не отрисовываться до тех пор, пока загрузка чего-то не закончится
            startAsync={loadApplication}
            onError={e => console.log(e)}
            onFinish={() => setIsReady(true)}
        />
    }

    const addTodo = title => {
        setTodos(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                title
            }
        ])
    };

    const removeTodo = id => {
        const todo = todos.find(item => item.id === id);
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${todo.title}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        setTodoId(null);
                        setTodos(prev => prev.filter(todo => todo.id !== id))
                    }
                }
            ],
            {
                cancelable: false
            }
        );
    };

    const updateTodo = (id, title) => {
        setTodos(old => old.map(todo => {
            console.log(todo.id, id)
            if (todo.id === id) {
                todo.title = title
            }
            return todo
        }))
    };

    let content = (
        <MainScreen
            todos={todos}
            addTodo={addTodo}
            removeTodo={removeTodo}
            openTodo={setTodoId}
        />
    )

    if (todoId) {
        const selectedTodo = todos.find(todo => todo.id === todoId)
        content =
            <TodoScreen onSave={updateTodo} onRemove={removeTodo} goBack={() => setTodoId(null)} todo={selectedTodo}/>
    }

    return (
        <View>
            <Navbar title='Todo App!'/>
            <View style={styles.container}>{content}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.paddingHorizontal,
        paddingVertical: 20
    }
});
