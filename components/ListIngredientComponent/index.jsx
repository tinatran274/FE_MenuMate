import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { getIngredientData, selectIsLoading, selectIsSuccess, selectIsError, selectResponse} from '../../redux/ingredient/ingredientSlice'
import { useSelector, useDispatch } from 'react-redux'
import { CardIngredientComponent } from '../../components/CardIngredientComponent/index'
import GradientCircleNextButton from '../../components/UI/GradientCircleNextButton/index';
import GradientCirclePreviousButton from '../../components/UI/GradientCirclePreviousButton/index';
import GradientCircleButton from '../UI/GradientCircleButton/index';
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

export const ListIngredientComponent = () => {

    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const [searchTerm, setSearchTerm] = useState("")
    const [category, setCategory] = useState("")
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({
        current_page: 1,
        page_size: 10,
        total_items: 0,
        total_pages: 0,
    });

    const fetchData = async () => {
        const { current_page, page_size } = pagination;
        const res = await dispatch(getIngredientData(current_page, page_size, category))
        setData(res.data);
        setPagination(res.pagination); 
    }

    useEffect(() => {
        fetchData();
    }, [pagination.current_page, category]);

    if (loading) {
        return <View><ActivityIndicator size="large" color="#0000ff" /></View>   
    }
    // if (error) {
    //     return <View><Text>Error loading ingredients.</Text></View>
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
                        placeholder="Nhập nguyên liệu cần tìm ..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>
            </View>
            <View style={{display: "flex", flexDirection: "row", gap: 5, marginVertical: 10, flexWrap: "wrap"}}>
                <TouchableOpacity style={{ backgroundColor: category === "" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6 }} onPress={() => setCategory("")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Grains" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Grains")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Nhóm tinh bột</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Fats and oils" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Fats and oils")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Nhóm chất béo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Protein" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Protein")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Nhóm đạm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Vegetables" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Vegetables")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Nhóm rau củ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Fruits" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Fruits")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Trái cây</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Salt and sauces" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Salt and sauces")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Gia vị</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.list_item}>
                {data && data.map((ingr) => { return (
                        <CardIngredientComponent
                            key={ingr.id}
                            ingredient = {ingr}/>
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

export default ListIngredientComponent;


const styles = StyleSheet.create({
    container: {
        
    },
    list_item: {
        display: "flex", flexDirection: "colum,", gap: 15, marginHorizontal: 5, marginTop: 20,
        marginBottom: 40
    },
})
