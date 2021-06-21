import React from "react";
import Button from "@atlaskit/button";
import styled, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check"

const ButtonStyled = styled(Button)`
    margin-top: 10px;
    text-align: left;
    padding: 5px;

    &, &:hover {
      ${p => 
        p.isCompleted && 
        css`
          text-decoration: line-through;
      `}
    }
    

    &:hover {
      .check-icon {
        display: inline-block;
      }
    }

    .check-icon {
      display: none;

      &:hover {
        background-color: #e2e2e2;
        border-radius: 3px;
      }
    }
`;

export default  function TodoList({ todo, onCheckBtnClick }) {
  
  return (
    <>
      <ButtonStyled 
        isCompleted={ todo.isCompleted }
        shouldFitContainer
        iconAfter={ 
          !todo.isCompleted && (
            <span className="check-icon" onClick={() => onCheckBtnClick(todo.id) }> 
              <CheckIcon primaryColor='#4fff4f' /> 
            </span> 
          )
          
        }
      >
        {todo.name}
      </ButtonStyled>
    </>
  )
}
 
