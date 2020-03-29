import React,{useState,useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';//importa módulo para permitir navegação
import {View,Image,Text,TouchableOpacity} from 'react-native';

import api from '../../services/api';

import logoImg from  '../../assets/logo.png';

import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';//Permitir rolar um scroll dentro desse view

export default function Incidents() {

    const navigation = useNavigation();// Define variavel que chama navegação

    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);

    function navigateToDetail(incident) {
        navigation.navigate('Detail',{incident});
    }

    async function loadIncidents() {

        if(loading) {
            return ;
        }

        if(total > 0 && incidents.length === total) {
            return;
        } 

        setLoading(true);//Está em uma requisição

        const response = await api.get('incidents',{
            params:{page}
        });
        //Lembrando que isso abaixo sóa acontece quando requisiçãor retorna por causo do await
        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page +1 )
        setLoading(false);//requisição terminou
    }

    useEffect(()=>{

        loadIncidents();

    },[]);

    console.log(incidents)
  
    return(

        <View style={styles.container}>
            <View style={styles.header}>
                <Image source = {logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve</Text>


            <FlatList
                data={incidents} 
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item:incident})=>(
                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty} >ONG:</Text>
                    <Text style={styles.incidentValue} >{incident.name}</Text>

                    <Text style={styles.incidentProperty} >CASO:</Text>
                    <Text style={styles.incidentValue} >{incident.title}</Text>

                    <Text style={styles.incidentProperty} >VALOR:</Text>
                    <Text style={styles.incidentValue} >{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity style = { styles.detailsButton } onPress = { () => navigateToDetail(incident) }>
                        <Text style = {styles.detailsButtonText} >Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="white"></Feather>
                    </TouchableOpacity>
                </View>

                )}
             />
        </View>

    );
}