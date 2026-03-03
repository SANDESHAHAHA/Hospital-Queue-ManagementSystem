const checkOTPexpirationTime = (OTPgeneratedTime:string, thresholdTime:number): boolean => {
    const currentTime = Date.now()
    return currentTime - parseInt(OTPgeneratedTime) <= thresholdTime
}

export default checkOTPexpirationTime