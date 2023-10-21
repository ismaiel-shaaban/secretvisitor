import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import React from 'react'
import { Colors } from '../Theme';
export const Parent = styled("div")(({ theme }) => ({
    position : "fixed" ,
    top : "0" ,
    left : "0" ,
    width : "100%" ,
    height : "100%" ,
    backgroundColor : "rgba(0,0,0,0.4)" ,
    zIndex : "10" ,
}));
export const modifiedCircularProgress = styled(CircularProgress)(({ theme }) => ({
    color : "#fff" ,
}));
const Loading = () => {
  return (
    <>
        <Parent>
            <CircularProgress 
                style = {{
                    position: "relative" ,
                    top : "50%" ,
                    left : "50%" ,
                    zIndex : "50" ,
                    color : "#fff" ,
                    width : "70px" ,
                    height : "70px"
                }}
            />
        </Parent>
    </>
  )
}

export default Loading