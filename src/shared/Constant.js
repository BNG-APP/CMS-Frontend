export const API_BASE_URL = "https://swip4winapiv1.bngrenew.com:5081/swipe4win/"
export const API_URLS = {
    getQuestion: API_BASE_URL + "getquestions/uploadeddata",
    Register: API_BASE_URL + "register",
    Questions: API_BASE_URL + "user/questions",
    Buy: API_BASE_URL + "pack/buy",
    Answer: API_BASE_URL + "user/question/answer",
    Start: API_BASE_URL + "quiz/start",
    End: API_BASE_URL + "quiz/end",
    LeaderBoard: API_BASE_URL + "user/leaderboard",
    OTP: API_BASE_URL + "prelogin/user/generateotp",
    VerifyOTP: API_BASE_URL + "prelogin/user/verifyotp"
}