import React from 'react';
import styled from 'styled-components';

type Props = {
  title?: string;
  children: React.ReactNode[] | React.ReactNode;
};
export const PageContainer: React.FC<Props> = ({ title, children }) => {
  return (
    <Wrapper>
      {title && <PageHeader>{title}</PageHeader>} {children}
    </Wrapper>
  );
};

const PageHeader = styled.h1`
  font-size: 19px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondary[2]};
  width: 100%;
  margin-right: 17px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    margin: 0 10px;
    margin-bottom: 30px;
  }

  &:before {
    content: '';
    width: 5px;
    height: 40px;
    background-color: ${({ theme }) => theme.secondary[3]};
    display: flex;
    margin: ${({ theme }) =>
      theme.dir === 'rtl' ? '0 0 0 15px' : '0 15px 0 0'};
  }

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.secondary[3]};
    display: flex;
    margin: ${({ theme }) =>
      theme.dir === 'rtl' ? '0 15px 0 0' : '0 0 0 15px'};
  }
`;

const Wrapper = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  .ant-row {
    width: 100%;
    display: 'flex';
    flex-flow: 'row wrap';
  }

  @media only screen and (max-width: 767px) {
    padding: 50px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }
`;
