```javascript
// bug.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(data => setUserData(data));
  }, []);

  return (
    <View>
      <Text>{userData.name}</Text>  {/* Error here if userData hasn't loaded */}
    </View>
  );
};

export default MyComponent;

```

```javascript
// bugSolution.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const MyComponent = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text>{userData.name}</Text>
    </View>
  );
};

export default MyComponent;
```