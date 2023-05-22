
export const fetchCookies = (key) => {
    const cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        const keyValueCookies = cookies[i].split("=")
        if(keyValueCookies[0].trim() === key.trim() &&keyValueCookies[1] ){
        return keyValueCookies[1]
        }
    }
}
