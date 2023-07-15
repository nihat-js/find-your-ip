


async function getUserIP() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", "https://api.ipify.org/?format=json", true)
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.statusText));
            }
            resolve(xhr.response)
        }
        xhr.send();

    })
}

async function getIPInfo(ip) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", "http://ip-api.com/json/" + ip, false)
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.statusText));
            }
            resolve(xhr.response)
        }
        xhr.send()
    })
}

async function main() {
    try {
        let data = await getUserIP()
        data = JSON.parse(data)
        let userIP = data.ip
        let userIPInfo = JSON.parse(await getIPInfo(userIP))
        // console.log({ userIPInfo })

        document.querySelector(".input").style.display = "block"
        document.querySelector(".output").style.display = "block"

        document.querySelector(".ip-info").innerText = userIP
        document.querySelector(".country-info").innerText = userIPInfo.country
        document.querySelector(".city-info").innerText = userIPInfo.city

        document.querySelector(".latitude-info").innerText = userIPInfo.lat
        document.querySelector(".longitude-info").innerText = userIPInfo.lon
    }
    catch (error) { 
        console.error(`Promise rejected`,error)
    }

}

document.getElementById("btn-find-ip").addEventListener("click", main)



