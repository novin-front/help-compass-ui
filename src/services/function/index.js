import crypto from 'crypto';

export const createSha256Hash = (key) => {
    const hash = crypto.createHash("sha256").update(key).digest("hex");
    return hash;
}


export const convertArrayToString = (array) => {
    return array.join(",").replace(/,/g, "");
}


export const passwordValidation = (value) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/g.test(
        value,
    );
}
export const IsValidEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
        value
    );
}
export const userForbidden = (error) => {
    console.log("error =>", error)
    if (isEmpty(error)) {
        if (!(error.hasOwnProperty("response"))) {
            if (error.response.data.statusCode === "403") {
                localStorage.clear();
                window.location.replace(window.location.origin);
            } else {
                localStorage.clear();
                window.location.replace(window.location.origin);
            }
        }

    } else {
        window.location.replace(window.location.origin);
        localStorage.clear();
    }

}
export const isEmpty = (value) => {
    if (value == null) {
        return true
    } else if (value === undefined) {
        return true
    } else if (value === "") {
        return true
    } else if (value == 'null' || value == 'undefined') {
        return true
    } else {
        return false;
    }
}