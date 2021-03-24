import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: '95%',
  },
  item: {
    width: '95%',
    height: 121,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    marginTop: 8,
  },
  imageContainer: {
    flex: 1,
  },
  largeText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 30,
    fontWeight: '600',
    marginHorizontal: 8,
    marginBottom: 7,
    marginTop: 2,
    width: 240,
  },
  smallText: {
    fontSize: 13,
    color: '#7a7878',
    lineHeight: 20,
    marginHorizontal: 7,
    fontWeight: '500',
    width: 220,
  },
  addrText: {
    fontSize: 13,
    color: '#7a7878',
    lineHeight: 25,
    fontWeight: '500',
    marginLeft: 8,
  },
  cityText: {
    fontSize: 13,
    color: '#7a7878',
    lineHeight: 25,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  list: {
    marginTop: 30,
  },
  header: {
    backgroundColor: '#fff',
    padding: 10,
    // marginVertical: 20,
    borderRadius: 4,
    width: '95%',
    alignSelf: 'center',
    marginTop: 100,
  },
  searchImage: {
    position: 'absolute',
    width: 14,
    height: 14,
    top: 11,
    left: 8,
  },
  search: {
    paddingHorizontal: 22,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderErr: {fontSize: 18},
  highlighted: {backgroundColor: '#FFFA86'},
});
