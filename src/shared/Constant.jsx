export const API_BASE_URL = "https://swip4winapiv1.bngrenew.com:5081/swipe4win/"
export const API_URLS = {
    getQuestion: API_BASE_URL + "getquestions/uploadeddata",
    dataUpload: API_BASE_URL + "servicedata/zip/upload",
    opertordata: API_BASE_URL + "data/alloperators",
    Edit: API_BASE_URL + "cms/questions/edit",
    Delete: API_BASE_URL + "cms/questions/delete",
    LogoUpload: API_BASE_URL + "cms/upload/logo",
    BannerUpload: API_BASE_URL + "cms/upload/banner",
    LeaderBoard: API_BASE_URL + "user/leaderboard",
    OTP: API_BASE_URL + "prelogin/user/generateotp",
    VerifyOTP: API_BASE_URL + "prelogin/user/verifyotp"
}