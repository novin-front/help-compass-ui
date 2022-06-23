// import { ThunkAction } from "redux-thunk";
// import { Action } from "redux";
import axios from "axios";
import { dashboard } from '../actionTypes';
// import {registerState} from '../reducers/index';
import { isEmpty, IsValidEmail, passwordValidation, userForbidden } from "../function";
import { store } from "../store";
// import browserHistory from "../browserHistory";

export const updateFeaching = (
    status
) => async(
    dispatch,
) => {
    (await dispatch({
        type: dashboard.UPDATE_FEACHING,
        payload: { feaching: status },
    }));
};

export const updateFirstName = (
    firstName,
) => async(
    dispatch,
) => {
    const lastChar = firstName[firstName.length - 1];
    if (lastChar === undefined || /^[a-zA-Z]/.test(firstName)) {
        firstName.length <= 40 &&
            (await dispatch({
                type: dashboard.UPDATE_VALID_FIRST_NAME_VALUE,
                payload: { firstName: { value: firstName } },
            }));
    }
};

export const updateFirstNameErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_FIRST_NAME_ERROR_FIELD,
        payload: { firstName: { containErrors: status } },
    });
};

export const updateLastName = (
    lastName,
) => async(
    dispatch,
) => {
    const lastChar = lastName[lastName.length - 1];
    if (lastChar === undefined || /^[a-zA-Z]/.test(lastName)) {
        lastName.length <= 40 &&
            (await dispatch({
                type: dashboard.UPDATE_VALID_LAST_NAME_VALUE,
                payload: { lastName: { value: lastName } },
            }));
    }
};

export const updateLastNameErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_LAST_NAME_ERROR_FIELD,
        payload: { lastName: { containErrors: status } },
    });
};


export const updateUserGender = (
    gender,
) => async(
    dispatch,
) => {
    // only numbers
    if (gender.length < 10) {
        (await dispatch({
            type: dashboard.UPDATE_VALID_USER_GENDER,
            payload: { gender: { value: gender } },
        }));
    }
};

export const updateUserGenderErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_USER_GENDER_ERROR_FIELD,
        payload: { gender: { containErrors: status } },
    });
};


export const updateUniversityId = (
    universityId,
) => async(
    dispatch,
) => {
    const lastChar = universityId[universityId.length - 1];
    if (lastChar === undefined || /^[a-zA-Z0-9]/.test(universityId)) {
        universityId.length <= 15 &&
            (await dispatch({
                type: dashboard.UPDATE_VALID_UNIVERSITY_ID_VALUE,
                payload: { universityId: { value: universityId } },
            }));
    }
};

export const updateUniversityIdErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_UNIVERSITY_ID_ERROR_FIELD,
        payload: { universityId: { containErrors: status } },
    });
};



export const updateAvailabilities = (
    availabilities,
) => async(
    dispatch,
) => {
    const lastChar = availabilities[availabilities.length - 1];
    if (lastChar === undefined || /^[a-zA-Z]/.test(availabilities)) {
        availabilities.length <= 40 &&
            (await dispatch({
                type: dashboard.UPDATE_VALID_AVAILABILITIES_VALUE,
                payload: { availabilities: { value: availabilities } },
            }));
    }
};

export const updateAvailabilitiesErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_AVAILABILITIES_ERROR_FIELD,
        payload: { availabilities: { containErrors: status } },
    });
};

export const updateLanguage = (
    language,
) => async(
    dispatch,
) => {
    language.length <= 40 &&
        (await dispatch({
            type: dashboard.UPDATE_VALID_LANGUAGE_VALUE,
            payload: { language: { value: language } },
        }));
};

export const updateLanguageErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_LANGUAGE_ERROR_FIELD,
        payload: { language: { containErrors: status } },
    });
};

export const updateStudy = (
    study,
) => async(
    dispatch,
) => {
    study.length <= 40 &&
        (await dispatch({
            type: dashboard.UPDATE_VALID_STUDY_VALUE,
            payload: { study: { value: study } },
        }));
};

export const updateStudyErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_STUDY_ERROR_FIELD,
        payload: { study: { containErrors: status } },
    });
};

export const updateComment = (
    comment,
) => async(
    dispatch,
) => {
    const lastChar = comment[comment.length - 1];
    if (lastChar === undefined || /^[a-zA-Z]/.test(comment)) {
        comment.length <= 40 &&
            (await dispatch({
                type: dashboard.UPDATE_VALID_COMMENT_VALUE,
                payload: { comment: { value: comment } },
            }));
    }
};

export const updateCommentErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_COMMENT_ERROR_FIELD,
        payload: { comment: { containErrors: status } },
    });
};

export const updateProgramTime = (
    programTime,
) => async(
    dispatch,
) => {
    const lastChar = programTime[programTime.length - 1];
    if (lastChar === undefined || /^[a-zA-Z]/.test(programTime)) {
        programTime.length <= 40 &&
            (await dispatch({
                type: dashboard.UPDATE_VALID_PROGRAM_TIME_VALUE,
                payload: { programTime: { value: programTime } },
            }));
    }
};

export const updateProgramTimeErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_PROGRAM_TIME_ERROR_FIELD,
        payload: { programTime: { containErrors: status } },
    });
};





export const updateResponseCompleteProfile = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.GET_COMPLETE_PROFILE_RESPONSE,
        payload: { response },
    });
};
export const updateResponseUserInfo = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.GET_USER_INFO_RESPONSE,
        payload: { response },
    });
};
export const updateResponseUpdateProfile = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.GET_UPDATE_PROFILE_RESPONSE,
        payload: { response },
    });
};

export const updateResponseUserListData = (users) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.GET_USER_LIST_DATA_RESPONSE,
        payload: { users },
    });
};

export const submitCheckIsUserLogin = (
    status,
) => async(
    dispatch,
) => {
    let {
        userInof,
    } = store.getState().dashboard;

    let containErrors = false;

    if (!containErrors) {

        const token = localStorage.getItem("token");
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/auth/check-user-login", {
                        email: userInof.email,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    if (response.data.success) {
                        dispatch(updateResponseUserInfo(response.data));
                    } else {
                        localStorage.clear();
                        window.location.replace(window.location.origin);
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    console.log(error);
                    localStorage.clear();
                    window.location.replace(window.location.origin);

                });
        } catch (error) {
            dispatch(updateFeaching(false));
        }
    }
}


export const submitLoguot = (
    status,
) => async(
    dispatch,
) => {
    let {
        userInof,
    } = store.getState().dashboard;

    let containErrors = false;

    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/auth/logout", {
                        email: userInof.email,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        localStorage.clear();
                        window.location.replace(window.location.origin);
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    localStorage.clear();
                    window.location.replace(window.location.origin);
                    console.log(error);

                });
        } catch (error) {
            dispatch(updateFeaching(false));
        }
    }
}

export const feachAllUsersList = (
    status,
) => async(
    dispatch,
) => {
    let {
        userInof,
    } = store.getState().dashboard;

    let containErrors = false;

    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/user-list", {
                        email: userInof.email,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateResponseUserListData(response.data.users));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    console.log(error);
                    dispatch(updateResponseUserListData([]))

                });
        } catch (error) {
            dispatch(updateFeaching(false));
        }
    }
}


export const updateResponseActiveUser = (id) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.GET_USER_ACTIVE_RESPONSE,
        payload: { id: id, },
    });
};
export const submitActiveUserByID = (
    id,
    email,
) => async(
    dispatch,
) => {
    let {
        userInof,
    } = store.getState().dashboard;

    let containErrors = false;
    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/user-activity", {
                        id: id,
                        email: email,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {

                        dispatch(updateResponseActiveUser(id));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    console.log(error);
                });
        } catch (error) {
            dispatch(updateFeaching(false));
        }
    }
}


export const submitDeleteUserByID = (
    id,
    email,
) => async(
    dispatch,
) => {
    let {
        userInof,
    } = store.getState().dashboard;

    let containErrors = false;
    console.log("submitActiveUserByID")
    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/delete-user", {
                        id: id,
                        email: email,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateResponseDeleteUser(id));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    console.log(error);
                });
        } catch (error) {
            dispatch(updateFeaching(false));
        }
    }
}

export const updateResponseDeleteUser = (id) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.DELETE_USER_RESPONSE_BY_ID,
        payload: { id: id },
    });
};




export const submitUpdateProfileForm = (
    status,
) => async(
    dispatch,
) => {
    let {
        firstName,
        lastName,
        gender,
        universityId,
        userInof,
    } = store.getState().dashboard;

    let containErrors = false;
    if (firstName.value.length < 30 && firstName.value.length !== 0) {
        dispatch(updateFirstNameErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateFirstNameErrorField(true));

    }

    if (lastName.value.length < 30 && lastName.value.length !== 0) {
        dispatch(updateLastNameErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateLastNameErrorField(true));

    }
    if (gender.value.length < 10 && gender.value.length !== 0) {
        dispatch(updateUserGenderErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateUserGenderErrorField(true));

    }
    if (universityId.value !== "") {
        dispatch(updateUniversityIdErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateUniversityIdErrorField(true));
    }
    console.log(" 00 submit =>", userInof,
        userInof.email,
        firstName.value,
        lastName.value,
        gender.value,
        universityId.value, )
    if (!containErrors) {
        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        console.log("submit =>", userInof.id,
            userInof.email,
            firstName.value,
            lastName.value,
            gender.value,
            universityId.value, )
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/update-complete-profile", {
                        id: userInof.id,
                        email: userInof.email,
                        firstName: firstName.value,
                        lastName: lastName.value,
                        gender: gender.value,
                        universityId: universityId.value,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateResponseUpdateProfile({
                            token: response.data.token,
                            success: response.data.success,
                            message: response.data.message,
                            show: true,
                            activated: response.data.is_active,
                            profileStatus: response.data.profile_status
                        }));
                        localStorage.setItem("firstName", response.data.first_name ? response.data.first_name : "");
                        localStorage.setItem("lastName", response.data.last_name ? response.data.last_name : "");
                        localStorage.setItem("gender", response.data.gender ? response.data.gender : "");
                        localStorage.setItem("universityId", response.data.university_id ? response.data.university_id : "");
                    } else {
                        dispatch(updateResponseUpdateProfile({
                            token: "",
                            success: false,
                            message: response.data.message,
                            show: true,
                        }));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    console.log(error);
                    dispatch(updateResponseUpdateProfile({
                        token: "",
                        success: false,
                        message: "An error occurred while register in",
                        show: true,
                    }));

                });
        } catch (error) {
            dispatch(updateFeaching(false));
            dispatch(updateResponseUpdateProfile({
                token: "",
                isRegister: false,
                message: "An error !! Please check your connection",
                show: true,
            }));
        }
    }
}




export const updateLanguagesListData = (languages) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.GET_LANGUAGES_LIST_DATA_RESPONSE,
        payload: { languages },
    });
};
export const fetchAllLanguagesList = (
    status,
) => async(
    dispatch,
) => {
    let {
        userInof,
    } = store.getState().dashboard;

    let containErrors = false;

    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/language-list", {
                        email: userInof.email,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateLanguagesListData(response.data.languages));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    dispatch(updateLanguagesListData([]))
                });
        } catch (error) {
            dispatch(updateFeaching(false));
        }
    }
}



export const updateResponseProgramRequest = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.GET_PROGRAM_REQUEST_DATA_RESPONSE,
        payload: { response },
    });
};
export const submitProgramRequestForm = (
    status,
) => async(
    dispatch,
) => {
    let {
        firstName,
        lastName,
        universityId,
        availabilities,
        study,
        language,
        programTime,
        comment,
        userInof,
    } = store.getState().dashboard;

    let containErrors = false;
    if (availabilities.value.length < 30 && availabilities.value.length !== 0) {
        dispatch(updateAvailabilitiesErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateAvailabilitiesErrorField(true));

    }
    if (language.value.length < 30 && language.value.length !== 0) {
        dispatch(updateLanguageErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateLanguageErrorField(true));
    }
    if (!isEmpty(study.value)) {
        dispatch(updateStudyErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateStudyErrorField(true));

    }
    if (programTime.value.length < 40 && programTime.value.length !== 0) {
        dispatch(updateProgramTimeErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateProgramTimeErrorField(true));

    }

    if (!containErrors) {
        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/save-student-request", {
                        programTime: programTime.value,
                        universityId: universityId.value,
                        studentId: universityId.value,
                        studentName: firstName.value + " " + lastName.value,
                        studentStudyId: study.value,
                        studentLanguageId: language.value,
                        comment: comment.value,
                        availabilities: availabilities.value
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateResponseProgramRequest({
                            success: response.data.success,
                            message: response.data.message,
                            show: true,
                        }));

                    } else {
                        dispatch(updateResponseProgramRequest({
                            success: false,
                            message: response.data.message,
                            show: true,
                        }));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    console.log(error);
                    dispatch(updateResponseProgramRequest({
                        success: false,
                        message: "An error occurred while register in",
                        show: true,
                    }));
                });
        } catch (error) {
            dispatch(updateFeaching(false));
            dispatch(updateResponseUpdateProfile({
                token: "",
                isRegister: false,
                message: "An error !! Please check your connection",
                show: true,
            }));
        }
    }
}



export const updateStudentProgramRequestListData = (programRequest) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_REQUEST_PROGRAM_LIST_RESPONSE,
        payload: { programRequest },
    });
};

export const fetchProgramListById = (
    status,
) => async(
    dispatch,
) => {
    let {
        universityId,
    } = store.getState().dashboard;

    let containErrors = false;

    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/program-list-student", {
                        studentId: universityId.value,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateStudentProgramRequestListData(response.data.requestProgramList));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    console.log(error);
                    dispatch(updateStudentProgramRequestListData([]))

                });
        } catch (error) {
            console.log(error);
        }
    }
}





export const updateLanguageList = (
    languageID,
) => async(
    dispatch,
) => {

    languageID !== null &&
        (await dispatch({
            type: dashboard.UPDATE_LANGUAGE_LIST_ID,
            payload: { languageID: { value: languageID } },
        }));

};

export const updateLanguageListErrorField = (
    status,
) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_LANGUAGE_LIST_ID_ERROR_FIELD,
        payload: { teacherLanguageRequest: { containErrors: status } },
    });
};



export const updateTeacherLanguageRequestData = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_TEACHER_LANGUAGE_REQUEST_RESPONSE,
        payload: { response },
    });
};

export const fetchTeacherLanguageRequest = () => async(
    dispatch,
) => {
    let {
        universityId,
    } = store.getState().dashboard;

    let containErrors = false;

    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/get-teacher-language-request-by-id", {
                        teacherId: universityId.value,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response fetchTeacherLanguageRequest =>", response)
                    if (response.data.success) {
                        dispatch(updateTeacherLanguageRequestData({
                            requestId: response.data.request_id,
                            teacherName: response.data.teacher_name,
                            teacherId: response.data.teacher_id,
                            languageListId: response.data.language_list_id,
                        }));
                    } else {
                        dispatch(updateTeacherLanguageRequestData({
                            requestId: "",
                            teacherName: "",
                            teacherId: "",
                            languageListId: '',
                        }))
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    console.log(error.message);
                    dispatch(updateTeacherLanguageRequestData({
                        requestId: "",
                        teacherName: "",
                        teacherId: "",
                        languageListId: '',
                    }))

                });
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateResponseLanguageRequestForm = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_TEACHER_LANGUAGE_REQUEST_FORM_RESPONSE,
        payload: { response },
    });
};
export const submitLanguageRequestForm = (
    status,
) => async(
    dispatch,
) => {
    let {
        teacherLanguageRequest
    } = store.getState().dashboard;

    let containErrors = false;
    if (teacherLanguageRequest.languageListId.length > 0) {
        dispatch(updateLanguageListErrorField(false));
    } else {
        containErrors = true;
        dispatch(updateLanguageListErrorField(true));

    }


    if (!containErrors) {
        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/save-teacher-language-list-Id", {
                        requestId: teacherLanguageRequest.requestId,
                        teacherId: teacherLanguageRequest.teacherId,
                        teacherName: teacherLanguageRequest.teacherName,
                        languageListId: teacherLanguageRequest.languageListId.toString(),

                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateResponseLanguageRequestForm({
                            success: response.data.success,
                            message: response.data.message,
                            show: true,
                        }));

                    } else {
                        dispatch(updateResponseLanguageRequestForm({
                            success: false,
                            message: response.data.message,
                            show: true,
                        }));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    console.log(error);
                    dispatch(updateResponseLanguageRequestForm({
                        success: false,
                        message: "An error occurred while save form in",
                        show: true,
                    }));
                });
        } catch (error) {
            dispatch(updateFeaching(false));
            dispatch(updateResponseLanguageRequestForm({
                success: false,
                message: "An error ",
                show: true,
            }));
        }
    }
}

export const updateTeacherProgramListData = (response) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_TEACHER_PROGRAM_RESPONSE,
        payload: { response },
    });
};

export const fetchAllTeacherProgramList = () => async(
    dispatch,
) => {
    let {
        teacherLanguageRequest,
        universityId,
    } = store.getState().dashboard;

    let containErrors = false;
    console.log("teacherLanguageRequest ->", teacherLanguageRequest)
    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/get-teacher-program", {
                        teacherId: universityId.value,
                        languageListId: teacherLanguageRequest.languageListId.toString(),
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateTeacherProgramListData(response.data.programList));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    dispatch(updateTeacherProgramListData([]))
                });
        } catch (error) {
            dispatch(updateFeaching(false));
        }
    }
}



export const updateProgramStatusById = (id, status) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.UPDATE_PROGRAM_STATUS_BY_ID,
        payload: { id: id, status: status },
    });
};
export const submitProgramStatus = (
    id, status
) => async(
    dispatch,
) => {
    let {
        teacherLanguageRequest,
    } = store.getState().dashboard;

    let containErrors = false;
    console.log("submitActiveUserByID")
    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/change-program-status", {
                        id: id,
                        status: status,
                        teacherId: teacherLanguageRequest.teacherId,
                        teacherName: teacherLanguageRequest.teacherName,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {

                        dispatch(updateProgramStatusById(id, status));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    console.log(error);
                });
        } catch (error) {
            dispatch(updateFeaching(false));
        }
    }
}


export const updateStudyListData = (Studys) => async(
    dispatch,
) => {
    await dispatch({
        type: dashboard.GET_STUDY_LIST_DATA_RESPONSE,
        payload: { Studys },
    });
};
export const fetchAllStudyList = (
    status,
) => async(
    dispatch,
) => {
    let {
        userInof,
    } = store.getState().dashboard;

    let containErrors = false;

    if (!containErrors) {

        const token = localStorage.getItem("token");
        dispatch(updateFeaching(true));
        try {
            axios
                .post(
                    process.env.REACT_APP_API_BASE_URL +
                    "api/v1/user/study-list", {
                        email: userInof.email,
                    }, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                )
                .then((response) => {
                    dispatch(updateFeaching(false));
                    console.log("response =>", response)
                    if (response.data.success) {
                        dispatch(updateStudyListData(response.data.study));
                    }
                })
                .catch((error) => {
                    userForbidden(error);
                    dispatch(updateFeaching(false));
                    dispatch(updateStudyListData([]))
                });
        } catch (error) {
            dispatch(updateFeaching(false));
        }
    }
}