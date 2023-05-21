import styled, { css } from 'styled-components';


const baseButton = css`
  color: rgba(0, 0, 0, 0.85);
  border: none;
  text-decoration: none;
  background-color: inherit;
  font-size: 18px;
  line-height: 28px;
  cursor: pointer;
`

export const Primary = styled.button`
  ${baseButton}
  color: #52C41A;
  border: 1px solid #52C41A;
  border-radius: 5px;
  padding: 6px 19px 10px 19px;
`

export const Simple = styled.button`
  ${baseButton}
`

export const Form = styled.button`
${baseButton}
  width: 100%;
  padding: 8px 10px;
  background: #1890FF;
  font-size: 16px;
line-height: 24px;
  border-radius: 4px;
  color: #fff;
`
export const NewArticle = styled.button`
${baseButton}
  color: #52C41A;
  border: 1px solid #52C41A;
  border-radius: 5px;
  font-size: 14px;
  line-height: 22px;
  padding: 6px 10px;
`

export const Bordered = styled.button`
${baseButton}
border: 1px solid rgba(0, 0, 0, 0.85);
border-radius: 5px;
padding: 6px 19px 10px 19px;
`

export const Delete = styled.button`
${NewArticle}
color: #F5222D;
border: 1px solid #F5222D;
border-radius: 5px;
padding: 6px 17px;
`
export const Edete = styled.button`
${NewArticle}
color: #52C41A;
border: 1px solid #52C41A;
border-radius: 5px;
padding: 6px 17px;
`