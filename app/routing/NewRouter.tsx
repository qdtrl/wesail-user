import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { New, NewEvent, NewImage, NewLogbook, NewPost } from '../screens'

const NewStack = createNativeStackNavigator()

const NewRouter = () => {
  return (
    <NewStack.Navigator initialRouteName="/new">
      <NewStack.Screen
        name="/new"
        component={New}
        options={{ headerShown: false, title: '' }}
      />
      <NewStack.Screen
        name="/new/event"
        component={NewEvent}
        options={{ title: 'Événement' }}
      />
      <NewStack.Screen
        name="/new/logbook"
        component={NewLogbook}
        options={{ title: 'Journal de bord' }}
      />
      <NewStack.Screen
        name="/new/post"
        component={NewPost}
        options={{ title: 'Post' }}
      />
      <NewStack.Screen
        name="/new/image"
        component={NewImage}
        options={{ title: 'Image' }}
      />
    </NewStack.Navigator>
  )
}

export default NewRouter
