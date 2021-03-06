import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  Linking,
  AppState,
} from 'react-native';
import styles from 'styles/listStyles';
import constant from 'constant';

// Get the deep link used to open the app
const useMount = func => useEffect(() => func(), []);
const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);
  useMount(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      setUrl(initialUrl);
      setProcessing(false);
    };
    getUrlAsync();
  });
  return {url, processing};
};

const List = props => {
  const {url, processing} = useInitialURL();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const appState = useRef(AppState.currentState);

  // check app state
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
    } else {
      Linking.addEventListener('url', link => {
        const {url} = link;
        setQuery(url.replace('ourwebsite://ourwebsite/', ' ').trim());
      });
    }
  };

  useEffect(() => {
    if (!processing) {
      if (url !== null) {
        setQuery(url.replace('ourwebsite://ourwebsite/', ' ').trim());
      }
    }
    setIsLoading(true);
    fetch(constant.API_ENDPOINT)
      .then(response => response.json())
      .then(results => {
        setData(results);
        setFullData(results);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, [url, processing]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#eec243" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={styles.loaderErr}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }
  function renderHeader() {
    return (
      <View style={styles.header}>
        <Image
          style={styles.searchImage}
          source={require('assets/search.png')}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          value={query}
          onChangeText={text => handleSearch(text)}
          style={styles.search}
          autoFocus={true}
        />
      </View>
    );
  }

  const handleSearch = text => {
    const newData = fullData.filter(item => {
      const itemData = ` 
      ${item.name.toUpperCase()}  
      ${item.email.toUpperCase()}
      ${item.title.toUpperCase()}
      ${item.address.toUpperCase()}
      ${item.city.toUpperCase()}
      `;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
    setQuery(text);
  };

  const renderText = string =>
    string.split('').map((letter, i) => {
      let isHighlighted = query.includes(letter);
      return (
        <Text key={i} style={isHighlighted && styles.highlighted}>
          {letter}
        </Text>
      );
    });

  const Items = ({item, index}) => (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.largeText}>{renderText(item?.name)}</Text>
        <Text style={styles.smallText}>{renderText(item?.email)}</Text>
        <Text style={styles.smallText}>{renderText(item?.title)}</Text>
        <View style={styles.row}>
          <Text style={styles.addrText}>
            {renderText(item?.address)}
            {', '}
          </Text>
          <Text style={styles.cityText}>{renderText(item?.city)}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item?.avatar,
          }}
          style={styles.image}
          resizeMethod={'auto'}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={data}
        keyExtractor={item => item.email}
        renderItem={(item, index) => Items(item, index)}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

export default List;
