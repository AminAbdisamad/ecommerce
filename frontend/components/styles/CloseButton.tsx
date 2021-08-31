import styled from 'styled-components';

const CloseButton = styled.button`
  background: ${({ color }) => (color ? color : 'var(--primaryColor)')};
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 10px;
`;

export default CloseButton;
