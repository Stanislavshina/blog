import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const baseLink = css`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.85);
  font-size: 18px;
  line-height: 28px;
  &:hover{
    color: inherit;
  }
`;
export const Simple = styled(NavLink)`
  ${baseLink}
`;

export const Primary = styled(NavLink)`
  ${baseLink}
  color: #1890FF;
  font-size: 20px;
`;

export const Form = styled(NavLink)`
  ${baseLink}
  color: #1890FF;
  font-size: 12px;
  line-height: 20px;
`;

