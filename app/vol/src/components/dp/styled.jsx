import styled, { css } from 'styled-components'

export const StyledDP = styled.div`
    display: flex;
    background-color: var(--surface);
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    font-size: 3vw;
    color: white;
    border: .2vw solid wheat;

    ${props => css`
        width: ${props.size[0]}vw;
        height: ${props.size[0]}vw;
        font-size: ${0.3 * props.size[0]}vw;

       @media screen and (min-width: 1024px) and (orientation: landscape) {
            width: ${props.size[1]}vw;
            height: ${props.size[1]}vw;
            font-size: ${0.3 * props.size[1]}vw;
            border: .15vw solid wheat;
        }
    `}
`

export const StyledBadge = styled.div`

    border-radius: 100vw;
    position: absolute;

    display: flex;

    justify-content: center;
    align-items: center;

    ${props => css`
        width: ${props.badgeSize[0]}vw;
        height: ${props.badgeSize[0]}vw;
        margin-bottom: ${props.size[0] * Math.cos((props.angle || 135) * (Math.PI / 180))}vw;
        margin-left: ${props.size[0] * Math.sin((props.angle || 135) * (Math.PI / 180))}vw;
        
        @media screen and (min-width: 1024px) and (orientation: landscape) {
            width: ${props.badgeSize[1]}vw;
            height: ${props.badgeSize[1]}vw;
            margin-bottom: ${props.size[1] * Math.cos((props.angle || 135) * (Math.PI / 180))}vw;
            margin-left: ${props.size[1] * Math.sin((props.angle || 135) * (Math.PI / 180))}vw;
        }
    `}

`