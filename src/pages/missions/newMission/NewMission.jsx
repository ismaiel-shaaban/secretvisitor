import React, { useEffect, useState } from 'react'
import { SmallContainer } from '../../../components/SmallContainer'
import { SubmitButton } from '../../../components/SubmitButton'
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../store/slices/branchSlice';
import { MenuItem, Select } from '@mui/material';
import { use } from 'i18next';
import { Note } from '@mui/icons-material';
import { FlexCenter } from '../../../components/FlexCenter';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import FinishedData from './FinishedData';


const Parent = styled(SmallContainer)(({ theme }) => ({
  display : "flex" , 
  justifyContent : "space-between" , 
}));

const FirstData = styled("div")(({ theme }) => ({
  width : "70%" ,
  padding : "15px" , 
  borderRadius: "10px",
  backgroundColor: "#fff",
}));
const TitleDiv = styled("div")(({ theme }) => ({
}));
const Title = styled("div")(({ theme }) => ({
  fontSize: "18px",
}));
const Input = styled("input")(({ theme }) => ({
  width : "100%" , 
  height: '68px', 
  padding: '15px',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`,
  outline: 'none', 
  fontSize : "16px",
  "&.small" : {
    width : "425px" , 
    maxWidth:'100%', 
    height: '48px', 
  }, 
  "&.notes" : {
    width : "100%" , 
    height : "124px"
  }
  
}));
const Divider = styled("div")(({ theme }) => ({
  height: "1px",
  backgroundColor: Colors.input,
  margin: "20px 0",
  width : "100%"
}));
const Selectt = styled(Select)(({ theme }) => ({
  width : "425px" , 
  height: '48px', 
  maxWidth:'100%', 
  outline: 'none',
  border: `1px solid ${Colors.input}`,
  borderRadius: '10px',
  "&:hover" : {
    border: `1px solid ${Colors.input}`,
  },
  fontFamily : "Cairo" ,
}));
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: 'Cairo', 
}));

const DateInput = styled("input")(({ theme }) => ({
  width: '100%',
  height: '48px',
  padding: '15px',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`, 
  color : Colors.input,
  fontSize: '16px',
  [theme.breakpoints.down('500')]: {
    width: '100%',
  }
}));
const TimeInput = styled("input")(({ theme }) => ({
  width: '148px',
  height: '48px',
  top: '454px',
  padding: '15px',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`, 
  color : Colors.input,
  gap: '8px',
  fontSize: '16px',
}));

const DateTime = styled("div")(({ theme }) => ({
  display : "flex" , 
  justifyContent : "space-between" , 
  alignItems : "center" ,     
  [theme.breakpoints.down('600')]: {
    flexDirection : "column" ,
    alignItems : "flex-start" ,
  } 
  
}));
const DateDiv = styled("div")(({ theme }) => ({
  width: "425px" , 
  height: "80px" ,
  borderRadius: "10px" , 
  border: "1px" ,
  [theme.breakpoints.down('900')]: {
    width: "50%" , 
  }, 
  [theme.breakpoints.down('500')]: {
    width: '100%',
  }
}));

const TimeDiv = styled("div")(({ theme }) => ({
  display : "flex" , 
  [theme.breakpoints.down('500')]: {
    flexDirection : "column" , 
    alignItems : "flex-start" ,
  }
}));
const FromToTimeDiv = styled("div")(({ theme }) => ({
  margin : "0 20px" ,
  [theme.breakpoints.down('600')]: {
    margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0  0 20px" ,
  }
}));
// voucher 
const VoucherDiv = styled("div")(({ theme }) => ({
  display : "flex" , 
  [theme.breakpoints.down('500')]: {
    flexDirection : "column" , 
    alignItems : "flex-start" ,
  }
}));
const CheckDiv = styled("div")(({ theme }) => ({
  display : "flex" , 
  alignItems : "center" , 
  justifyContent : "center" ,
  margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0  0 20px" ,
  [theme.breakpoints.down('500')]: {
    margin : "0 0 15px 0" ,
  }
}));
const CheckInput = styled("input")(({ theme }) => ({
  width : "18px" , 
  height : "18px" ,
  accentColor: Colors.main , 
  margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0  0 20px" ,
}));
const CheckLabel = styled("label")(({ theme }) => ({

}));
const VoucherInput = styled("input")(({ theme }) => ({
  width: '85px',
  height: '44px',
  padding: '10px 15px',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`,
  fontSize: '16px',
  outline: 'none',
}));
// notes 
const NotesText = styled("textarea")(({ theme }) => ({
  height : "124px" , 
  padding: '10px',
  resize: 'none',
  width: '100%',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`,
  fontSize : "16px",
  outline: 'none', 
}));

// submit button
const SubmitButton2 = styled(SubmitButton)(({ theme }) => ({
  width: '170px',
}));

//************************************* Finished Data **************************************  */



const NewMission = () => {
  //title
  const [title , setTitle] = useState('');
  // focus 
  const [focus , setFocus] = useState('');
  
  // branches 
  const [currentBranches , setCurrentBranches] = useState ([])
  const getBranchesData = useSelector(state => state.branchData.getBranchesData) ;
  useEffect(()=>{
    if (getBranchesData.status) {
      setCurrentBranches(getBranchesData.data.branches)
    }
  },[getBranchesData])
  const dispatch = useDispatch() ;
  useEffect(() => {
    dispatch(getBranches())
  }, [])

  const [selectedBranch, setSelectedBranch] = useState('');
  const handleSelectedBranch = (event) => {
    setSelectedBranch(event.target.value);
  };
  // date and time 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [date, setDate] = useState('');
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');

  // voucher 
  const [voucherChecked ,  setVoucherChecked] = useState(false);
  const [voucherValue ,  setVoucherValue] = useState('');

  // notes 
  const [notes ,  setNotes] = useState('');

  useEffect (()=>{
    console.log (notes)
  },[notes])

  
  
  const removeSpaces = (str) => {
    let i = 0 ; 
    while (str[i]==' ') {
      str = str.replace(' ' , '')
      i++ ; 
    }
    return str ;
  }
  const handleTitle  = (e) => {
    let title = removeSpaces(e.target.value)
    setTitle(title)
  }
  const handleFocus  = (e) => {
    let focus = removeSpaces(e.target.value)
    setFocus(focus)
  }
  const handleVoucher  = (e) => {
    let voucher = e.target.value
    if (!isNaN(voucher)) setVoucherValue(voucher)
  }
  return (
    <>
    <Parent>
      <FirstData>
        <TitleDiv>
            <Title>Title</Title>
            <Input 
              placeholder='here'
              value={title}
              onChange={handleTitle}
            />
        </TitleDiv>
        <Divider/>
        <TitleDiv>
            <Title>type what you want he/she to focus on!</Title>
            <Input 
              placeholder='here' 
              className='small'
              value={focus}
              onChange={handleFocus}
            />
        </TitleDiv>
        <Divider/>
        <TitleDiv>
            <Title>Branch</Title>
            <Selectt
              value={selectedBranch}
              onChange={handleSelectedBranch}
            >
              {currentBranches.map((branch, index) => (
                <StyledMenuItem key={index} value={branch.id}>
                  {branch.name}
                </StyledMenuItem>
              ))}
          </Selectt>
        </TitleDiv>
        <Divider/>
        {/* date time section  */}
        <DateTime>
          <DateDiv>
          <Title>Date</Title>   
            <DateInput type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
          </DateDiv>
          <TimeDiv>
            <FromToTimeDiv>
            <Title>from</Title>   
              <TimeInput type="time" value={time1} onChange={(e)=>setTime1(e.target.value)} />
            </FromToTimeDiv>   
            <FromToTimeDiv>
            <Title>to</Title>  
              <TimeInput type="time" value={time2} onChange={(e)=>setTime2(e.target.value)} />
            </FromToTimeDiv>    
          </TimeDiv>
        </DateTime>
        <Divider/>
          <VoucherDiv>
            <CheckDiv>
              <CheckInput
                  id='voucher'
                  type="checkbox"
                  checked={voucherChecked}
                  onChange={(e)=>setVoucherChecked(e.target.checked)}
              />
              <CheckLabel htmlFor='voucher'>Include Purchase voucher</CheckLabel>
            </CheckDiv>
            {voucherChecked && 
              <VoucherInput 
                placeholder='00 SAR'
                type = "text"
                value={voucherValue}
                onChange={handleVoucher}

              />
            }
          </VoucherDiv>
        <Divider/>
        <TitleDiv>
            <Title>Notes</Title>
            <NotesText 
              placeholder='here'
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
            />
        </TitleDiv>
        <SubmitButton2>Next</SubmitButton2>
      </FirstData>
      <FinishedData
        missionTitle={title}
        missionFocus={focus}
        missionSelectedBranch={selectedBranch}
        missionDate={date}
        missionTime1={time1}
        missionTime2={time2}
        missionVoucherChecked={voucherChecked}
        missionVoucherValue={voucherValue}
        missionNotes={notes}
      />
    </Parent>
    </>
  )
}

export default NewMission