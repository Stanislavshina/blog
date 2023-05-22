import styled, { css } from 'styled-components';

const baseInput = css`
  width: 300px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 6px 12px;
  color: rgba(0, 0, 0, 0.75);
`;

export const Span = styled.span`
  color: #f5222d;
`;

export const InputField = styled.input`
  ${baseInput}
  &.error {
    border-color: #f5222d;
    color: #f5222d;
    &:focus {
      border-color: #f5222d;
    }
  }
`;

export const ErrorInputField = styled.input`
  ${baseInput}
  border-color: #f5222d;
  &:focus {
    border-color: #f5222d;
  }
  & + span {
    color: #f5222d;
  }
`;

export const TextArea = styled.textarea`
  resize: none;
  height: 170px;
  padding: 5px 5px;
  width: 875px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  &.error {
    border-color: #f5222d;
    color: #f5222d;
    &:focus {
      border-color: #f5222d;
    }
  }
`;

const baseArticleInput = css`
  width: 875px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 6px 12px;
  color: rgba(0, 0, 0, 0.75) !important;
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const ArticleInput = styled.input`
  ${baseArticleInput}
  &.error {
    border-color: #f5222d;
    color: #f5222d;
    &:focus {
      border-color: #f5222d;
    }
  }
`;
