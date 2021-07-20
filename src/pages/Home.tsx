import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTask {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExist = tasks.find(item => item.title === newTaskTitle);

    if (taskExist) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    
    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const findTask = updatedTasks.find(item => item.id === id);

    if(!findTask)
      return;

    findTask.done = !findTask.done;
    
    setTasks(updatedTasks);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTask) {
    const editedTasks = tasks.map(task => ({ ...task }));

    const findTask = editedTasks.find(item => item.id === taskId);

    if(!findTask)
      return;

    findTask.title = taskNewTitle;

    setTasks(editedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks(oldState => oldState.filter(
              skill => skill.id !== id
            ));
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})