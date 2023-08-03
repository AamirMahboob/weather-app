import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
const image = {uri: 'https://cdn.pixabay.com/photo/2019/06/29/17/35/tree-4306636_1280.jpg'};
export default function App() {
  const api = {
    key : '4b5ccbbebbadf8cbab35b1aa3ffc8871',
    url : 'https: //api.openweathermap.org/data/2.5/'

  }
  const [loading,setLoading] = useState(false);
  const [input,setInput] = useState('');
  const [data,setData ] = useState([]);
  const fetchDatahandler = useCallback(()=>{
   setLoading(true);
   setInput('');
   axios({
    method:'GET',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api.key}`
    }
   )

    .then(res => {
      console.log(res.data);

      setData(res.data);
    })
    .catch(e=>console.dir(e))
    .finally(()=>setLoading(false))

  },[api.key,input])
  return (

    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                 <View>
                  <TextInput placeholder='Enter city name and press return' 
                  style={styles.textInput}
                   value={input} 
                   onChangeText={text => setInput(text)} 
                   
                  onSubmitEditing={fetchDatahandler}
                  ></TextInput>
                 </View>
                 {
                  loading && <View>
                    <ActivityIndicator size={100} color={'orange'}>
                    </ActivityIndicator>
                  </View>
                 }
                 {
                  data && (<View style ={styles.infoView}>
                      <Text style={{color:'white', fontSize:30,fontWeight:'bold'}} >
                         {`${data?.name} ${data?.sys?.country}  `}
                        </Text>
                        <Text style ={{color:'white' , fontSize:22 , marginVertical:10}}>
                           {new Date().toLocaleString()}
                        </Text>
                        <Text style={{color:'white',fontSize:25,marginVertical:10}}>{`${Math.round(data?.main?.temp)}°C`}</Text>
                        <Text style={{color:'white',fontSize:25}}>{`Min ${Math.round(data?.main?.temp_min)}°C, Max ${Math.round(data?.main?.temp_max)}°C`}</Text>
                  </View>)
                 }

      </ImageBackground>
      <StatusBar
        backgroundColor="white"
         
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    
  },
  image:{
    flex:1,
    flexDirection:'column',
    
     opacity:.8,
      
     
  },
  textInput:{
    marginTop:100,
    backgroundColor:'white',
    width:'90%',
    margin:25,
    height:50,
    borderRadius:5,
    padding:10
  },
  infoView:{
    marginVertical:120,
    alignItems:'center'
  },
  
});
