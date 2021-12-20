import { useState, useEffect } from 'react'

const UseGoogleAddress = (address, city, province, country) => {
    const [map, setMap] = useState({})
    const API = `https://maps.googleapis.com/maps/api/geocode/json?$address=${address}&key=AIzaSyAy0SY1G3OFqesWSTQRHJvzyJzNgURPoN8`;
    useEffect(() => {
        fetch(API)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMap(response?.data?.results)
            })
            .catch(() => {
            })
    }, [API, address])
    return map
}
