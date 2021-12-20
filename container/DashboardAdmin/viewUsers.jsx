import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api'
import React, { useState, useEffect, useCallback } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { AwesomeModal } from '../../components/AwesomeModal'
import mapStyle from '../../components/Layout/LocationUser/Map/mapStyles'
import { RippleButton } from '../../components/Ripple'
import { BColor, BGColor, PColor, SCColor } from '../../public/colors'
import { IconArrowLeft } from '../../public/icons'
import { useUser } from '../Profile'

const ViewUsers = ({ data }) => {
    console.log(data)
    const [dataUser] = useUser()
    const [modal, setModal] = useState(false)
    const handleClickMenu = index => setModal(index === modal ? false : index)
    return (
        <>
            <UserBox>
                <MainInfo>
                    <CircleUser>
                        {data?.uEmail?.slice(0, 2).toUpperCase()}
                    </CircleUser>
                    <BoxInfo>
                        <Text>{data?.userName}</Text>
                    </BoxInfo>
                    <RippleButton bgColor={SCColor} margin='20px 0px' onClick={handleClickMenu} type='submit'>{'View Info'}</RippleButton>
                </MainInfo>
            </UserBox>
            <UsersModal modal={modal} setModal={setModal} data={data} />
        </>
    )
}
ViewUsers.propTypes = {

}

export default ViewUsers

export const UsersModal = ({ modal, setModal, data }) => {
    console.log(data)
    const mapContainerStyle = {
        height: '60vh',
        width: '50%',
        position: 'absolute'
    }
    const options = {
        styles: mapStyle,
        disableDefaultUI: true,
        zoomControl: false

    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBjsZdzx04Ol7DQ7v4BXimgxC1JwNCAnj0"
    })
    const [map, setMap] = useState(null)
    const defaultCenter = {
        lat: map && parseFloat(data.lat),
        lng: map && parseFloat(data.long)
    }
    const center = {
        lat: -3.745,
        lng: -38.523
    };
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])
    const [markers, setMarkers] = useState([])
    const onMapClick = useCallback(e => {
        setMarkers(() => [{
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }])
    })
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    return (
        <div>
            <AwesomeModal zIndex='99' padding='20px' height='800px' show={modal} onHide={() => setModal(!modal)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
                <BoxInfo>
                    <ContainerMap>
                        <MapHeader>
                            <button style={{ backgroundColor: 'transparent' }} onClick={() => setModal(!modal)} >
                                <IconArrowLeft size={20} color={PColor} />
                            </button>
                            <span>Username: {data?.userName}</span><div></div>
                        </MapHeader>
                        {isLoaded && <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={9}
                            onLoad={onLoad}
                            options={options}
                            onClick={onMapClick}
                            center={map ? defaultCenter : defaultCenter}
                            onUnmount={onUnmount}
                        >
                            <Marker position={defaultCenter && defaultCenter} />
                            <></>
                        </GoogleMap>}
                    </ContainerMap>
                    <BoxInfo>
                        <BoxActions>
                            <SendSms>
                                sendSms
                            </SendSms>
                        </BoxActions>
                    </BoxInfo>
                </BoxInfo>
            </AwesomeModal >
        </div>
    )
}
const BoxActions = styled.div`
    position: absolute;
    right: 0;
    width: 50%;
    padding: 40px;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
const SendSms = styled.button`
    align-items: center;
    cursor: pointer;
    display: flex;
    font-size: 1em;
    justify-content: center;
    padding: 16px 32px;
    border-radius: 8px;
    background-color: #0069ff;
    border: 1px solid #0069ff;
    color: ${BGColor};
    transition: all 0.2s ease;
    z-index: 999;
    align-self: flex-start;
    margin-right: 24px;
    width: 100%;
    position: relative;
`
const MapHeader = styled.div`
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    grid-template-columns: 50px 1fr 50px;
    padding: 27px 20px;
    z-index: 99;
    background: linear-gradient(
    0deg
    , rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.8) 25%, white 100%);
`

const Text = styled.h5`
    color: ${BColor};
    margin-top: 0;
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
    font-size: 1.25rem;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const UserBox = styled.div`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    box-sizing: border-box;
    display: flex ;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
    border-radius: 10px;
    padding: 10px 35px;
`
const BoxInfo = styled.div`
    width: 100px;

`
const CircleUser = styled.div`
  border: 2px solid #12d4aaef;
  border-radius: 50%;
  height: 50px;
  background-color: ${BGColor};
  width: 50px;
  min-height: 50px;
  text-align: center;
  display: grid;
  place-content: center;
  min-width: 50px;
  ${props => props.pulse
        ? css`
    animation: ${pulse} 2s infinite;
  `
        : css`
  ` }
  ${props => props.active
        ? css`
    box-shadow: 0 0 0 10px #12d4aaef, 0 0 0 22px #12d4aa9e;
    `
        : css`
    box-shadow: 0 0 0 10px #ebeef3, 0 0 0 22px #f3f4f6;
  ` }
  
`
const ContentButton = styled.div`
    width: 100%;
    position: absolute;
    margin: auto;
    display: flex;
    justify-content: center;
    z-index: 99999;
    bottom: -550px;
`

const MainInfo = styled.div`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    justify-content: space-between;
    color: #212529;
    text-align: left;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`

const ContainerMap = styled.div`
    transition: 500ms ease;
    border-radius: 4px;
    width: 300px;
`