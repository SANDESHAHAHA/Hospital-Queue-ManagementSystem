const checkOTPexpirationTime = (OTPgeneratedTime, thresholdTime) => {
    const currentTime = Date.now();
    return currentTime - parseInt(OTPgeneratedTime) <= thresholdTime;
};
export default checkOTPexpirationTime;
//# sourceMappingURL=checkOTPexiparationTime.js.map