import styled from 'styled-components';
import { borderRadius, boxShadow } from 'utils/styleUtils';

type Props = {
  width?: number;
  height?: number;
  hasTitle?: boolean;
};
export const ChartsWrapper = styled.div<Props>`
  margin: 0 10px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  padding: ${props =>
    props.hasTitle ? '20px 20px 57px 10px' : '20px 20px 20px 10px'};
  background-color: #fff;
  direction: ltr;
  ${borderRadius('5px')}
  ${boxShadow(`5px 5px 7px #d9d9d9`)}
  @media only screen and (max-width: 767) {
    margin-right: 0 !important;
  }

  .title {
    direction: rtl;
    margin-bottom: 7px;
  }
`;
