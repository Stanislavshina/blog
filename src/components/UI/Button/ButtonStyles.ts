import styled, { css } from 'styled-components';

const baseButton = css`
  color: rgba(0, 0, 0, 0.85);
  border: none;
  text-decoration: none;
  background-color: inherit;
  font-size: 18px;
  line-height: 28px;
  cursor: pointer;
`;

export const Primary = styled.button`
  ${baseButton}
  color: #52C41A;
  border: 1px solid #52c41a;
  border-radius: 5px;
  padding: 6px 19px 10px 19px;
`;

export const Simple = styled.button`
  ${baseButton}
`;

export const Form = styled.button`
  ${baseButton}
  width: 100%;
  padding: 8px 10px;
  background: #1890ff;
  font-size: 16px;
  line-height: 24px;
  border-radius: 4px;
  color: #fff;
`;
export const ArticleForm = styled.button`
  ${baseButton}
  width: 320px;
  padding: 8px 10px;
  background: #1890ff;
  font-size: 16px;
  line-height: 24px;
  border-radius: 4px;
  color: #fff;
  align-self: flex-start;
`;

export const NewArticle = styled.button`
  ${baseButton}
  color: #52C41A;
  border: 1px solid #52c41a;
  border-radius: 5px;
  font-size: 14px;
  line-height: 22px;
  padding: 6px 10px;
`;

export const Bordered = styled.button`
  ${baseButton}
  border: 1px solid rgba(0, 0, 0, 0.85);
  border-radius: 5px;
  padding: 6px 19px 10px 19px;
`;

export const Delete = styled.button`
  cursor: pointer;
  background-color: #fff;
  color: #f5222d;
  border: 1px solid #f5222d;
  border-radius: 5px;
  padding: 6px 17px;
`;
export const Edete = styled.button`
  background-color: #fff;
  color: #52c41a;
  cursor: pointer;
  border: 1px solid #52c41a;
  border-radius: 5px;
  padding: 7px 17px;
`;

export const DelTag = styled.button`
  color: #f5222d;
  border: 1px solid #f5222d;
  border-radius: 5px;
  font-size: 14px;
  padding: 6px 36px;
  background-color: #fff;
  cursor: pointer;
  max-width: 120px;
  width: 100%;
`;

export const AddTag = styled.button`
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 5px;
  font-size: 14px;
  padding: 6px 10px;
  background-color: #fff;
  cursor: pointer;
  max-width: 120px;
  width: 100%;
`;
