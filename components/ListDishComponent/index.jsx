import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { getDishData, selectIsLoading, selectIsSuccess, selectIsError, selectResponse} from '../../redux/dish/dishSlice'
import { useSelector, useDispatch } from 'react-redux'
import { CardDishComponent } from '../../components/CardDishComponent/index'
import GradientCircleNextButton from '../../components/UI/GradientCircleNextButton/index';
import GradientCirclePreviousButton from '../../components/UI/GradientCirclePreviousButton/index';
import { Ionicons } from '@expo/vector-icons';

export const ListDishComponent = () => {

    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({
        current_page: 1,
        page_size: 10,
        total_items: 0,
        total_pages: 0,
    });

    const fetchData = async () => {
        const { current_page, page_size } = pagination;
        const res = await dispatch(getDishData(current_page, page_size))
        setData(res.data);
        setPagination(res.pagination); 
    }

    useEffect(() => {
        fetchData();
    }, [pagination.current_page]);

    if (loading) {
        return <View><ActivityIndicator size="large" color="#0000ff" /></View>   
    }
    // if (error) {
    //     return <View><Text>Error loading dish.</Text></View>
    // }

    return (
        <View>
            <View style={{display:"flex", flexDirection: "row", alignItems: "center", 
            justifyContent: "space-between", marginVertical: 5, width: "100%" }}>
                <View style={{paddingHorizontal: 8, display:'flex', flexDirection: "row", 
                alignItems: "center", gap: 10, marginHorizontal: 2, paddingVertical: 8,
                borderRadius: 50,
                backgroundColor: "white",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 5,}}>
                    <Ionicons style={{borderRadius: 50, backgroundColor: "white",
                    shadowOffset: { width: 1, height: 1 }, height: "100%", 
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5,}} 
                    name="search-sharp" size={25} color="#BFBFBF" />
                    <TextInput style={{width: "85%",}}
                        placeholder="Nhập món ăn cần tìm ..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>
            </View>
            <View style={styles.list_item}>
                {data && data.map((dish) => { return (
                        <CardDishComponent
                            key={dish.id}
                            dish = {dish}/>
                    )})
                }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50, alignItems: "center" }}>
                {pagination.current_page > 1 && (
                    <GradientCirclePreviousButton 
                        onPress={() => setPagination((prev) => ({
                            ...prev,
                            current_page: prev.current_page - 1,
                        }))}
                        colors={['#FF1E3F', '#FF7E06']}
                    />
                )}
                {pagination.current_page && 
                    <Text style={{fontWeight: "bold"}}>Trang {pagination.current_page}</Text>
                    }
                {pagination.current_page < pagination.total_pages && (
                    <GradientCircleNextButton
                        onPress={() => setPagination((prev) => ({
                            ...prev,
                            current_page: prev.current_page + 1,
                        }))}
                        colors={['#FF1E3F', '#FF7E06']}
                    /> 
                    
                )}
            </View>
        </View>
    );
};

export default ListDishComponent;


const styles = StyleSheet.create({
    container: {
        
    },
    list_item: {
        display: "flex", flexDirection: "row", gap: 15, marginHorizontal: 5, marginTop: 20, 
        marginBottom: 40, flexWrap: "wrap"
    },
})
