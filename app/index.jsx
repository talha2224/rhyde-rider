import { router } from 'expo-router'
import { useEffect } from 'react'
import { Image, View } from 'react-native'
import Logo from '../assets/images/logo.png'

const DefaultScreen = () => {

    useEffect(() => {
        setTimeout(() => {
            router.push("/onboarding");
        }, 2000);
    }, [])

    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Image source={Logo} />

        </View>

    )
}

export default DefaultScreen