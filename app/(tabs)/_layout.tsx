import { Tabs } from 'expo-router';
import { Code, Clapperboard, Home } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="j"
        options={{
          title: 'Movie',
          tabBarIcon: ({ color, size }) => < Clapperboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="k"
        options={{
          title: 'Code',
          tabBarIcon: ({ color, size }) => <Code size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="l"
        options={{
          title: 'Code',
          tabBarIcon: ({ color, size }) => <Code size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}