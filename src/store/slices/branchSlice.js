import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
const currentLanguage = localStorage.getItem("language") || "en";
export const addBranch = createAsyncThunk(
"branch/addBranch", 
async (values) => {
    try {
    const response = await axios.post(
        "https://mystery.cloudy.mohamedmansi.com/api/addBranch" ,{
            name:values.name,
            address:values.address , 
            lat : values.lat ,
            long : values.long
        },{
            headers: {
                "Authorization" : "Bearer 112|nZSbjQaMv0nJkmfw2puEbR6O1LGN6g1tQ9XgWdYo3fba4d22" , 
                "lang" : currentLanguage ,
            },
        }
    );
    return response.data ;
    } catch (error) {
    console.error(error);
    }
}
);
export const deleteBranch = createAsyncThunk(
    "branch/deleteBranch", 
    async (values) => {
        try {
        const response = await axios.get(
            `https://mystery.cloudy.mohamedmansi.com/api/deleteBranch?branch_id=${values.id}` ,{
                headers: {
                    "Authorization" : "Bearer 112|nZSbjQaMv0nJkmfw2puEbR6O1LGN6g1tQ9XgWdYo3fba4d22" , 
                    "lang" : currentLanguage ,
                },
            }
        );
        return response.data ;
        } catch (error) {
        console.error(error);
        }
    }
    );

export const getBranches = createAsyncThunk(
    "branch/getBranches", 
    async (values) => {
        try {
        const response = await axios.get(
            "https://mystery.cloudy.mohamedmansi.com/api/getBranches" ,{
                headers: {
                    "Authorization" : "Bearer 112|nZSbjQaMv0nJkmfw2puEbR6O1LGN6g1tQ9XgWdYo3fba4d22" , 
                    "lang" : currentLanguage , 
                },
            }
        );
        return response.data ;
        } catch (error) {
            console.error(error);
        }
    }
    );


const branchSlice = createSlice({
name: "branch",
initialState: {
    addBranchData: {},
    getBranchesData : {} ,
    getBranchesDataLoading : false ,
    deleteBranchData : {} ,
    deleteBranchLoading : false , 
    
},
extraReducers: (builder) => {
    builder
    .addCase(addBranch.fulfilled, (state, action) => {
        state.addBranchData = action.payload;
    }) 

    .addCase(getBranches.fulfilled, (state, action) => {
        state.getBranchesData = action.payload;
        state.getBranchesDataLoading = false;
    }) 
    .addCase(getBranches.pending, (state, action) => {
        state.getBranchesDataLoading = true;
    }) 
    .addCase(getBranches.rejected , (state, action) => {
        state.getBranchesDataLoading = false;
    })

    .addCase(deleteBranch.fulfilled , (state, action) => {
        state.deleteBranchData = action.payload;
        state.deleteBranchLoading = false;
    }) 
    .addCase(deleteBranch.pending, (state, action) => {
        state.deleteBranchLoading = true;
    }) 
    .addCase(deleteBranch.rejected , (state, action) => {
        state.deleteBranchLoading = false;
    })

}
});

export default branchSlice.reducer;