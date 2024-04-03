import styled from 'styled-components'

export const MainContainer = styled.div`
	width: 100%;
  background-color: ${({ isDetailPostPage }) => isDetailPostPage ? '#fdf3ea;' : 'white'};
`
