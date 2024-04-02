import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {New, NewEvent, NewLogbook, NewPost, NewStory} from "../screens";

const NewStack = createNativeStackNavigator();

const NewRouter = () => {
    return (
        <NewStack.Navigator initialRouteName="/new">
            <NewStack.Screen
                name="/new"
                component={New}
                options={{headerShown: false, title: ''}}
            />
            <NewStack.Screen
                name="/new/event"
                component={NewEvent}
                options={{headerShown: false, title: ''}}
            />
            <NewStack.Screen
                name="/new/logbook"
                component={NewLogbook}
                options={{headerShown: false, title: ''}}
            />
            <NewStack.Screen
                name="/new/post"
                component={NewPost}
                options={{headerShown: false, title: ''}}
            />
            <NewStack.Screen
                name="/new/story"
                component={NewStory}
                options={{headerShown: false, title: ''}}
            />
        </NewStack.Navigator>
    )
}

export default NewRouter;