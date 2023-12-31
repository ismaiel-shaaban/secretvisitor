import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import plusSign from '../../assets/icons/plusSign.svg'
import {Colors} from "../../Theme"
import { Box, ListItemText, Popover } from '@mui/material';
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import Loading  from '../../components/Loading';
import { Flex } from '../../components/Flex';
import { FlexCenter } from '../../components/FlexCenter';
import QuestionsTypes from './QuestionsTypes';
import QuestionComponent from './QuestionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestioneir, editQuestioneir, getQuestionnaire, handleReadyToSend, handleReadyToSend2, sendQuestioneir, setCurrentQuestioneir, setCurrentStep, setNewQuestioneirName, setNewStep } from '../../store/slices/questionierSlice';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const Parent = styled(Box)(({ theme }) => ({
  width : "100%" ,
  margin  : "0 10px" ,
  [theme.breakpoints.down('800')]: {
    margin  : "0" ,
  },
}));

const Settings = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  padding : "20px" ,
  borderRadius : "10px" ,
  [theme.breakpoints.down('800')]: {
    width : "100%" ,
    margin : "0 auto" ,
  },
}));
const InputAndButtons = styled(FlexSpaceBetween)(({ theme }) => ({
  alignItems : "center" ,
  [theme.breakpoints.down('1500')]: {
    alignItems : "flex-start" ,
    flexDirection : "column" ,
    gap : "10px" ,
  },
}));
const InputContainer = styled("div")(({ theme }) => ({
  backgroundColor : Colors.main ,
  padding : "20px" ,
  borderRadius : "10px" ,
  height : "80px" , 
  width : "80%" , 
  [theme.breakpoints.down('1500')]: {
    width : "100%" ,
  },
}));
const Input = styled("input")(({ theme }) => ({
  backgroundColor : "transparent" ,
  width : "100%" ,
  color : "#fff" ,
  border: "1px solid transparent" , 
  borderBottom: "1px solid #fff" , 
  outline : "none" ,
  fontSize : "20px" ,
  "::placeholder": {
    color: Colors.gray_l
  },
  '::selection': {
    backgroundColor: Colors.hoverMain, 
  },
}));

const ButtonsContainer = styled(Flex)(({ theme }) => ({
  [theme.breakpoints.down('1500')]: {
    flexWrap : "wrap" ,
     gap : "10px" 
  },
}));
const AddQuestionContainer = styled("div")(({ theme }) => ({
  padding : "10px" ,
  borderRadius: '10px',
  display : "flex" , 
  justifyContent : "space-between" ,
  alignItems : "center" ,
  backgroundColor : Colors.grayDC ,
  margin : "0 10px" , 
  height : "60px" , 
  cursor : "pointer" ,
  transition : "all 0.3s ease" , 
  width : "200px" ,
  "&:hover" : {
    backgroundColor : Colors.hoverGray ,
  } , 
  [theme.breakpoints.down('1500')]: {
    marginLeft : theme.direction == "ltr" ? "0" : "10px" ,
    marginRight : theme.direction == "rtl" ? "0" : "10px" , 
  },
  [theme.breakpoints.down('800')]: {
    width : "80%" ,
    justifyContent : "center" ,
  },
}));
const AddQuestionButton = styled("div")(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  textAlign: 'center',
  width : "100%" ,
}));
const ActionButton = styled(FlexCenter)(({ theme }) => ({
  width: '76px',
  height: '60px',
  padding: '10px 12px 10px 12px',
  borderRadius: '10px',
  backgroundColor: Colors.green,
  color : "#fff" , 
  cursor : "pointer" ,
  transition : "all 0.3s ease" , 
  marginLeft : "10px" ,
  "&:hover" : {
    backgroundColor : Colors.hoverGreen ,
  },
  "&.cancel" : {
    backgroundColor : Colors.red , 
    "&:hover" : {
      backgroundColor : Colors.hoverRed ,
    }
  },
  [theme.breakpoints.down('800')]: {
    marginLeft : theme.direction == "ltr" ? "0" : "10px" ,
    marginRight : theme.direction == "rtl" ? "0" : "10px" ,
  },
}));
const AddStepButton = styled(FlexCenter)(({ theme }) => ({
  padding: '5px 20px',
  borderRadius: '10px',
  gap: '10px',
  backgroundColor: Colors.bg,
  margin : "10px 10px" , 
  fontSize : "20px" ,
  color : Colors.gray_l ,
  cursor : "pointer" ,
  transition : "all 0.3s ease" ,
  "&:hover" : {
    backgroundColor : Colors.grayDC ,
  } , 
  "&.active" : {
    color:'white' , 
  backgroundColor : Colors.second ,
} , 
[theme.breakpoints.down('350')]: {
  width : "100%" , 
  },
}));
const QuestionView = styled("div")(({ theme }) => ({
  
}));

const AddButton = styled("div")(({ theme }) => ({
  backgroundColor : Colors.main ,
  display : "inline" ,
  padding : "5px 10px" ,
  borderRadius : "10px" ,
  color : "#fff" ,
  cursor : "pointer" ,
  marginRight : theme.direction == "ltr" ? "10px" : "0" ,
  marginLeft : theme.direction == "rtl" ? "10px" : "0" ,
  transition : "all .3s ease-in-out" ,
  "&:hover" : {
    backgroundColor : Colors.hoverMain ,
  },
  textAlign : "center" ,
  width : "50px" , 
}));
const StepsContainer = styled(FlexCenter)(({ theme }) => ({
  flexWrap : "wrap" , 
}));

const AnswerInput = styled("input")(({ theme }) => ({
  backgroundColor : "transparent" ,
  width : "80%" ,
  border: "1px solid transparent" , 
  borderBottom: `1px solid ${Colors.input}` , 
  outline : "none" ,
  "::placeholder": {
    color: Colors.gray_l
  },
  margin : "0 10px" ,
}));

const QuestionnaireSettings = ({isAddNew}) => {
  // pop over when click on the button the list of questions type will appear
  const questionierDataSent = useSelector((state) => state.questioneirData.questionierDataSent);
  const questionierDataDelete = useSelector((state) => state.questioneirData.questionierDataDelete);
  const questionieres = useSelector((state) => state.questioneirData.questionieres);
  const currentQuestioneir = useSelector((state) => state.questioneirData.currentQuestioneir);
  const currentStep = useSelector((state) => state.questioneirData.currentStep);
  const isReadyToSend = useSelector((state) => state.questioneirData.isReadyToSend);
  const [anchorEl, setAnchorEl] = useState(null);

  const [answersStep, setAnswersStep] = useState([]); 
  const [showNewStep, setShowNewStep] = useState(false); 

  const showTypes = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  useEffect(() => {
    if(!isAddNew)dispatch(getQuestionnaire())
  },[isAddNew])
  const getQuestionnaireLoading = useSelector((state) => state.questioneirData.getQuestionnaireLoading);

  const [chosenType , setChosenType] = useState(null) ; 
  const [newAnswer, setNewAnswer] = useState('');

  const dispatch = useDispatch() ; 


 
  const handleAddAnswerStep = () => {
    if (newAnswer.trim() !== '') {
      dispatch(setNewStep(newAnswer))

      setNewAnswer('');
      setShowNewStep(false)
    }
  };
  const handleQuestioneirTitle = (value) => {
    dispatch(setNewQuestioneirName(value))
  };

  const handleAddStep = () => {
    setShowNewStep(true)
  };


  const handleClickStep = (index,questions) => {
    dispatch(setCurrentStep(index))
    console.log(questionieres[currentQuestioneir].steps);
 
  };
  const [pressSave , setPressSave] = useState(false) ;
  useEffect(() => {
    if (questionierDataSent&& pressSave){
      Swal.fire(questionierDataSent.message, '', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    }
  },[questionierDataSent])
  
  useEffect(() => {
    if (questionierDataDelete&& pressSave){
      Swal.fire(questionierDataDelete.message, '', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
      
    }
  },[questionierDataDelete])

  const handleSaveQuestioneir = () => {
    console.log(questionieres[currentQuestioneir]);
    setPressSave(true)
    Swal.fire({
      title: t("text.are_you_sure_you_want_to_save_this_Questionnaire"),
      showDenyButton: true,
      confirmButtonText: t("text.Yes"),
      denyButtonText: t("text.No"),
    }).then((result) => {
      if (result.isConfirmed) {
        if(questionieres[currentQuestioneir].id){

          dispatch(editQuestioneir([questionieres[currentQuestioneir]]))
        }
        else dispatch(sendQuestioneir([questionieres[currentQuestioneir]]))
      } else if (result.isDenied) {
        Swal.fire(t("text.Changes_are_not_saved"), '', 'info')
      }
    })
  };

  const handleDeleteQuestioneir = () => {
    console.log(questionieres[currentQuestioneir]);
    setPressSave(true)
    Swal.fire({
      title: t("text.are_you_sure_you_want_to_delete_this_Questionnaire"),
      showDenyButton: true,
      confirmButtonText: t("text.Yes"),
      denyButtonText: t("text.No"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteQuestioneir([questionieres[currentQuestioneir]]))
      } else if (result.isDenied) {
        Swal.fire(t("text.Changes_are_not_saved"), '', 'info')
      }
    })

  };
  const [activeStep, setActiveStep] = useState(0);
  const {t} = useTranslation() ; 
  return (
    <>
    <QuestionsTypes  setAnchorEl= {setAnchorEl} anchorEl={anchorEl} setChosenType = {setChosenType}/>
    {getQuestionnaireLoading ? <Loading/> : 
    <Parent>
        <Settings>
          <InputAndButtons>
            <InputContainer>
              <Input 
              value={questionieres[currentQuestioneir].title} 
              placeholder= "Title"
              onChange={(e) => handleQuestioneirTitle(e.target.value)}
              />
            </InputContainer>
            <ButtonsContainer>
              <AddQuestionContainer onClick = {showTypes}>
                <img src = {plusSign} style = {{margin : "10px" }} />
                <AddQuestionButton > {t("text.Add_Question")}</AddQuestionButton>
              </AddQuestionContainer>
              <ActionButton onClick={()=>handleSaveQuestioneir()} > {t("text.Save")}</ActionButton>
              <ActionButton onClick={()=>handleDeleteQuestioneir()} className = "cancel">{t("text.Delete")}</ActionButton>
            </ButtonsContainer>
          </InputAndButtons>
          <StepsContainer style={{justifyContent:'start'}}>

            {questionieres[currentQuestioneir] ? questionieres[currentQuestioneir].steps.map((answer ,index)=>
              <>
               <AddStepButton 
                  onClick={()=>{handleClickStep(index,answer.questions); setActiveStep(index) ;  }}
                  className= {activeStep==index ? 'active' : ''}
                  >
                  {answer.name}
               </AddStepButton>
              </>
            ): ''}
         
          <AddStepButton onClick={handleAddStep}>+</AddStepButton>



          </StepsContainer>
          {showNewStep ?  
          
          <FlexCenter style={{justifyContent:'start' ,flexWrap:'wrap'}}>
            {/* <AnswerInput></AnswerInput> */}
            <AddButton onClick={handleAddAnswerStep}>Save </AddButton>
              <AnswerInput
                type="text"
                placeholder="Write a new step"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
          </FlexCenter>
          : ''}
        </Settings>
        <QuestionView>
          {
            questionieres[currentQuestioneir].steps.length>0 ?
            
            <QuestionComponent questions ={questionieres[currentQuestioneir].steps[currentStep].questions}></QuestionComponent>
            :''

          }
        </QuestionView>
    </Parent>
    
    }
    </>
  )
}

export default QuestionnaireSettings