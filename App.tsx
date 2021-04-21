import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./screens/Auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "./contexts/auth.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast, TOKEN_PREFIX } from "./utility/commonUtility";
import Splash from "./components/Splash";
import Api from "./utility/API"
import { ToastAndroid } from "react-native";
import Barcode from "./screens/Barcode";

const RootStack = createStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem(TOKEN_PREFIX);
        
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (data: object) => {
        Api.post("/place/placeLogin", data)
        .then(async result => {
          try {
            
            await AsyncStorage.setItem(TOKEN_PREFIX, result.data.data);
            dispatch({ type: "SIGN_IN", token: result.data.data });
            showToast("Logged In !")
          } catch (e) {
            // Restoring token failed
            showToast("Something went wrong !!")
          }
  
          
        }).catch(err => {
          if(err.response.status){
           return showToast("Invalid Credentials !")
          }
          return showToast("Something went wrong !!")
        })
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem(TOKEN_PREFIX);
        } catch (e) {
          // Restoring token failed
        }        dispatch({ type: "SIGN_OUT" })},
      signUp: (data: object) => {
       
      Api.post("/place/newPlace", data)
      .then(async result => {
        try {
          showToast("Registered !")
          await AsyncStorage.setItem(TOKEN_PREFIX, result.data.data);
          dispatch({ type: "SIGN_IN", token: result.data.data });
        } catch (e) {
          // Restoring token failed
          return showToast("Something went wrong !!") 
        }

        
      }).catch(err => {
        console.log(err);
        return showToast("Something went wrong !!") 
        
      })
        
      },
    }),
    []
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {state.userToken != null ? (
              <>
              <RootStack.Screen name="App" component={Tabs} />
              <RootStack.Screen name="Barcode" component={Barcode} />
              </>
            ) : (
              <RootStack.Screen name="Auth" component={Auth} />
            )}
          </RootStack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
